import React, { FC, useEffect, useState, useCallback } from 'react';
import { notification, Row, Spin } from 'antd';

import dayjs from '@/app/common/libraries/dayjs';
import useParamRouter from '@/app/hooks/useParamRouter';
import { getBrandLotsByModel } from '@/modules/Auction/api';
import Card from '@/app/common/components/Card';
import { IAuction, IAuctionFilters } from '@/app/interfaces/Auction';
import FilterContainer from '@/modules/Auction/containers/FilterContainer';

interface IBrandLotsContainer {}

const BrandLotsContainer: FC<IBrandLotsContainer> = () => {
  const {
    brandName,
    modelName,
    auctionDate,
    engineCapacity,
    color,
    mileage,
    transmission,
    manufactureYear,
  } = useParamRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [brandLots, setBrandLots] = useState<Array<IAuction>>([]);
  const [allBrandLots, setAllBrandLots] = useState<Array<IAuction>>([]);
  const [filters, setFilters] = useState<IAuctionFilters>();

  const fetchAllBrandLots = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getBrandLotsByModel(brandName, modelName);

      setBrandLots(res?.data?.data || []);
      setAllBrandLots(res?.data?.data || []); // default fetched brand lots
      setFilters(res?.data?.filter || []);
    } catch (error) {
      console.log(error);
      notification.error({
        message: 'Oops! Looks like something went wrong.',
        description: 'Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [brandName, modelName]);

  useEffect(() => {
    fetchAllBrandLots();
  }, [brandName, modelName, fetchAllBrandLots]);

  // on filters change
  useEffect(() => {
    const filteredBrandLots = allBrandLots.filter((data) => {
      if (
        !auctionDate &&
        !color &&
        !engineCapacity &&
        !manufactureYear &&
        !mileage &&
        !transmission
      ) {
        return true;
      }

      const {
        auctionDate: brandLotAuctionDate,
        engineSizeCc,
        exteriorColorName,
        providerMileage,
        transmissionType,
        yearOfProduction,
      } = data;

      if (
        auctionDate &&
        (dayjs(auctionDate)
          .startOf('day')
          .isAfter(dayjs(brandLotAuctionDate)) ||
          dayjs(auctionDate).endOf('day').isBefore(dayjs(brandLotAuctionDate)))
      ) {
        return false;
      }

      if (engineCapacity && engineCapacity !== engineSizeCc) {
        return false;
      }

      if (color && color !== exteriorColorName) {
        return false;
      }

      if (mileage && mileage !== providerMileage) {
        return false;
      }

      if (transmission && transmission !== transmissionType) {
        return false;
      }

      if (manufactureYear && manufactureYear !== yearOfProduction) {
        return false;
      }

      return true;
    });

    setBrandLots(filteredBrandLots);
  }, [
    allBrandLots,
    auctionDate,
    color,
    engineCapacity,
    manufactureYear,
    mileage,
    transmission,
  ]);

  if (isLoading) {
    return <Spin />;
  }

  return (
    <Row gutter={[16, 16]}>
      <FilterContainer filters={filters} />
      {brandLots.map((auction) => (
        <Card key={auction.providerId} data={auction} />
      ))}
    </Row>
  );
};

export default BrandLotsContainer;
