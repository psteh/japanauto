'use client';

import React, { FC } from 'react';
import { Image, Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { CustomArrowProps } from 'react-slick';

interface IImageCarousel {
  images: Array<string>;
  width?: number | string;
  alt?: string;
}

const StyledCarousel = styled(Carousel)`
  // remove default arrow
  .slick-next {
    &::before {
      content: '';
    }
  }

  // remove default arrow
  .slick-prev {
    &::before {
      content: '';
    }
  }

  .slick-dots li button {
    background-color: #e7583a;
  }

  .slick-dots li.slick-active button {
    background-color: #df3d1a !important;
  }
`;

const ImageCarousel: FC<IImageCarousel> = ({ images, width, alt }) => {
  if (!images || images.length === 0) {
    return null;
  }

  const arrowStyle = {
    color: '#fff',
    fontSize: '24px',
    lineHeight: 1.5715,
    borderRadius: 100,
    backgroundColor: '#df3d1a',
    width: '24px',
    height: '24px',
    display: 'flex',
    padding: '4px',
    position: 'absolute',
  };

  const NextArrow = (props: CustomArrowProps) => {
    const { className, style, onClick } = props;

    return (
      <div
        className={className}
        style={{
          ...style,
          ...arrowStyle,
          position: 'absolute',
          right: '16px',
        }}
        onClick={onClick}
      >
        <RightOutlined />
      </div>
    );
  };

  const PrevArrow = (props: CustomArrowProps) => {
    const { className, style, onClick } = props;

    return (
      <div
        className={className}
        style={{
          ...style,
          ...arrowStyle,
          position: 'absolute',
          left: '16px',
          zIndex: 1,
        }}
        onClick={onClick}
      >
        <LeftOutlined />
      </div>
    );
  };

  return (
    <StyledCarousel
      arrows
      infinite={false}
      nextArrow={<NextArrow />}
      prevArrow={<PrevArrow />}
    >
      {images.map((image) => (
        <Image
          key={image}
          width={width || 700}
          src={image}
          alt={alt || image}
        />
      ))}
    </StyledCarousel>
  );
};

export default ImageCarousel;
