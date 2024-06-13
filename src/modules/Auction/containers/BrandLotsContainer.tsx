import React, { FC, useEffect, useState, useCallback } from 'react';
import { notification, Row, Spin } from 'antd';

import useParamRouter from '@/app/hooks/useParamRouter';
import { getBrandLotsByModel } from '@/modules/Auction/api';
import Card from '@/app/common/components/Card';
import { IAuction, IAuctionFilters } from '@/app/interfaces/Auction';
import FilterContainer from '@/modules/Auction/containers/FilterContainer';

interface IBrandLotsContainer {}

const BrandLotsContainer: FC<IBrandLotsContainer> = () => {
  const { brandName, modelName } = useParamRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [brandLots, setBrandLots] = useState<Array<IAuction>>([]);
  const [filters, setFilters] = useState<IAuctionFilters>();

  const fetchAllBrandLots = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getBrandLotsByModel(brandName, modelName);

      setBrandLots(res?.data?.data || []);
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
