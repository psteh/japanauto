import React, { FC, useEffect, useState, useCallback } from 'react';
import { notification, Table, Row } from 'antd';
import styled from 'styled-components';

import useParamRouter from '@/app/hooks/useParamRouter';
import { getBrandLotsByModel } from '@/modules/Auction/api';
import Card from '@/app/common/components/Card';
import { IAuction } from '@/app/interfaces/Auction';

interface IBrandLotsContainer {}

const StyledTable = styled(Table)``;

const BrandLotsContainer: FC<IBrandLotsContainer> = () => {
  const { brandName, modelName } = useParamRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [brandLots, setBrandLots] = useState<Array<IAuction>>([]);

  const columns = [
    {
      title: 'Lot No.',
      dataIndex: 'lotNumber',
      key: 'lotNumber',
      render: (_: any, data: { [key: string]: string | number | boolean }) => {
        const { brandName, modelName, chassisNumber, lotNumber } = data;
        return (
          <>
            <div>
              {brandName} {modelName}
            </div>
            <div>{chassisNumber}</div>
            <div>{lotNumber}</div>
          </>
        );
      },
    },
    {
      title: 'Auction Date',
      dataIndex: 'auctionDate',
      key: 'auctionDate',
    },
    {
      title: 'Manufacture Year',
      dataIndex: 'yearOfProduction',
      key: 'yearOfProduction',
    },
    {
      title: 'Mileage',
      dataIndex: 'providerMileage',
      key: 'providerMileage',
    },
  ];

  const fetchAllBrandLots = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getBrandLotsByModel(brandName, modelName);

      setBrandLots(res?.data?.data || []);
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

  // return <StyledTable columns={columns} dataSource={brandLots} />;

  return (
    <Row gutter={[16, 16]}>
      {brandLots.map((auction) => (
        <Card key={auction.providerId} data={auction} />
      ))}
    </Row>
  );
};

export default BrandLotsContainer;
