import React, { FC } from 'react';
import styled from 'styled-components';
import { Card, Col } from 'antd';
import Link from 'next/link';

import Carousel from '@/app/common/components/Carousel';

import { IAuction } from '@/app/interfaces/Auction';

const { Meta } = Card;

interface ICard {
  data: IAuction;
}

const StyledCard = styled(Card)`
  border-radius: 12px;
  max-width: 380px;
`;

const StyledCarouselContainer = styled.div`
  min-height: 260px;
`;

const StyledCarousel = styled(Carousel)`
  .slick-list {
    height: 260px;
  }

  .slick-dots li button {
    background-color: #e7583a;
  }

  .slick-dots li.slick-active button {
    background-color: #df3d1a !important;
  }
`;

const CardComponent: FC<ICard> = ({ data }) => {
  const {
    brandName,
    modelName,
    chassisNumber,
    auctionDate,
    yearOfProduction,
    providerMileage,
    providerId,
    auctionImages,
    auctionName,
  } = data;

  const renderImageCarousel = (
    <StyledCarouselContainer>
      <StyledCarousel
        images={auctionImages}
        width="100%"
        alt={`${brandName} ${modelName}`}
      />
    </StyledCarouselContainer>
  );

  const renderDescription = (
    <div>
      <div>Mileage: {providerMileage}</div>
      <div>Manufacture Year: {yearOfProduction}</div>
      <div>Auction Date: {auctionDate}</div>
      <div>Auction Name: {auctionName}</div>
    </div>
  );

  return (
    <Col span={6} className="">
      <Link href={`/auction/${providerId}`}>
        <StyledCard hoverable cover={renderImageCarousel}>
          <Meta
            title={`${brandName} ${modelName}`}
            description={renderDescription}
          />
        </StyledCard>
      </Link>
    </Col>
  );
};

export default CardComponent;
