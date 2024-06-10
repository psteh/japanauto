'use client';

import React, { useEffect, useCallback, useState } from 'react';
import { notification, Descriptions, Spin, Button } from 'antd';
import styled from 'styled-components';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

import {
  getLotDataByProviderId,
  getProviderPhotos,
} from '@/modules/Auction/api';
import { IAuction } from '@/app/interfaces/Auction';
import Layout from '@/app/common/components/Layout';
import Carousel from '@/app/common/components/Carousel';

import type { DescriptionsProps } from 'antd';

const StyledContainer = styled.div``;

const StyledCarousel = styled(Carousel)`
  .slick-arrow {
    background-color: green !important;
  }

  .slick-dots li button {
    background-color: #e7583a;
  }

  .slick-dots li.slick-active button {
    background-color: #df3d1a !important;
  }
`;

export default function AuctionLot({
  params,
}: {
  params: { providerId: string };
}) {
  const { back } = useRouter();

  const [lotData, setLotData] = useState<IAuction>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { providerId } = params;
  const descriptionTextStyle = { whiteSpace: 'nowrap' };

  const fetchAuctionLot = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getLotDataByProviderId(providerId);
      // const photosRes = await getProviderPhotos(providerId);

      console.log(res.data);

      setLotData(res.data);
    } catch (error) {
      console.log(error);
      notification.error({
        message: 'Oops! Looks like something went wrong.',
        description: 'Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [providerId]);

  const renderPhotos = (
    <StyledCarousel
      images={lotData?.auctionImages || []}
      width={700}
      alt={`${lotData?.brandName} ${lotData?.modelName}`}
    />
  );

  useEffect(() => {
    fetchAuctionLot();
  }, [providerId, fetchAuctionLot]);

  const items: DescriptionsProps['items'] = [
    {
      key: 'brandName',
      label: 'Auction',
      children: (
        <p
          style={{ ...descriptionTextStyle }}
        >{`${lotData?.brandName} ${lotData?.modelName}`}</p>
      ),
    },
    {
      key: 'chassisNumber',
      label: 'Chassis No.',
      children: (
        <p style={{ ...descriptionTextStyle }}>{lotData?.chassisNumber}</p>
      ),
    },
    {
      key: 'engineSizeCc',
      label: 'Engine Capacity (CC)',
      children: (
        <p style={{ ...descriptionTextStyle }}>{lotData?.engineSizeCc}</p>
      ),
    },
    {
      key: 'exteriorColorName',
      label: 'Color',
      children: (
        <p style={{ ...descriptionTextStyle }}>{lotData?.exteriorColorName}</p>
      ),
    },
    {
      key: 'power',
      label: 'Horsepower',
      children: <p style={{ ...descriptionTextStyle }}>{lotData?.power}</p>,
    },
    {
      key: 'providerMileage',
      label: 'Mileage',
      children: (
        <p style={{ ...descriptionTextStyle }}>{lotData?.providerMileage}</p>
      ),
    },
    {
      key: 'yearOfProduction',
      label: 'Manufacture Year',
      children: (
        <p style={{ ...descriptionTextStyle }}>{lotData?.yearOfProduction}</p>
      ),
    },
    {
      key: 'lotNumber',
      label: 'Lot No',
      children: <p style={{ ...descriptionTextStyle }}>{lotData?.lotNumber}</p>,
    },
  ];

  if (isLoading) {
    return (
      <Layout>
        <StyledContainer>
          <Spin />
        </StyledContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <StyledContainer>
        <Button type="link" onClick={back} className="mb-16">
          <ArrowLeftOutlined /> Back
        </Button>
        {renderPhotos}
        <Descriptions
          bordered
          title="Auction Lot"
          items={items}
          className="mt-16"
        />
      </StyledContainer>
    </Layout>
  );
}
