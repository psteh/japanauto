import React, { FC } from 'react';
import styled from 'styled-components';
import { Slider } from 'antd';

interface ISlider {
  marks?: {
    [key: number]: string | number | Object;
  };
  defaultValue?: number[];
  onChange?: () => void;
}

const StyledContainer = styled.div``;

const SliderComponent: FC<ISlider> = ({ marks, defaultValue, onChange }) => {
  return (
    <Slider
      range
      marks={marks}
      defaultValue={defaultValue}
      min={defaultValue?.[0]}
      max={defaultValue?.[1]}
      onChange={onChange}
    />
  );
};

export default SliderComponent;
