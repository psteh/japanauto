import React, { FC } from 'react';
import styled from 'styled-components';
import { Card, Col, Typography } from 'antd';
import Link from 'next/link';
import {
  CalendarOutlined,
  DashboardOutlined,
  HomeOutlined,
} from '@ant-design/icons';

import Carousel from '@/app/common/components/Carousel';

import { IAuction } from '@/app/interfaces/Auction';

const { Paragraph, Text } = Typography;
const { Meta } = Card;

interface ICard {
  data: IAuction;
}

const StyledCard = styled(Card)`
  border-radius: 12px;
  max-width: 380px;
`;

const StyledCarouselContainer = styled.div`
  width: 260px;
  max-height: 260px;
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
        maxHeight="260px"
        alt={`${brandName} ${modelName}`}
      />
    </StyledCarouselContainer>
  );

  const renderDescription = (
    <div>
      <div>
        <DashboardOutlined /> {providerMileage}
      </div>
      <div>
        <CalendarOutlined /> {auctionDate}
      </div>
      <div>
        <HomeOutlined /> {auctionName}
      </div>
    </div>
  );

  return (
    <Col span={6} className="">
      <StyledCard hoverable cover={renderImageCarousel}>
        <Link href={`/auction/${providerId}`}>
          <Meta
            title={
              <Paragraph
                copyable={{
                  text: `${window.location.origin}/auction/${providerId}`,
                }}
              >
                {`${yearOfProduction} ${brandName} ${modelName}`}
              </Paragraph>
            }
            description={renderDescription}
          />
        </Link>
      </StyledCard>
    </Col>
  );
};

export default CardComponent;
