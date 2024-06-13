import React, { FC } from 'react';
import styled from 'styled-components';
import { Popover, Button } from 'antd';

import Select from '@/app/common/components/Select';
import Slider from '@/app/common/components/Slider';
import { EFilterTypes } from '@/app/constants';
import useParamRouter from '@/app/hooks/useParamRouter';

interface IFilterContainer {
  id: string;
  type: EFilterTypes;
  title: string;

  // for Select
  placeholder?: string;
  value?: string | number;
  options?: Array<{
    [key: string]: string | number;
  }>;

  // for Slider
  marks?: {
    [key: number]: string | number | Object;
  };
  defaultValue?: number[];
}

const StyledPopover = styled(Popover)``;

const StyledContainer = styled.div``;

const FilterContainer: FC<IFilterContainer> = ({
  id,
  type,
  title,
  ...otherProps
}) => {
  const paramRouter = useParamRouter();

  let component = null;

  const handleOnChange = (value?: any): void => {
    if (value) {
      paramRouter.set({ [id]: value.toString() });
    }
  };

  switch (type) {
    case EFilterTypes.SELECT:
      component = <Select onChange={handleOnChange} {...otherProps} />;
      break;
    case EFilterTypes.SLIDER:
      const marks = Object.keys(otherProps.marks || {});
      component = (
        <Slider
          defaultValue={[Number(marks[0]), Number(marks[marks.length - 1])]}
          onChange={handleOnChange}
          {...otherProps}
        />
      );
      break;
    default:
      break;
  }

  if (!component) {
    return null;
  }

  const FilterComponent = (
    <StyledContainer className="p-2">{component}</StyledContainer>
  );

  return (
    <StyledPopover
      title={title}
      content={FilterComponent}
      placement="bottom"
      className="mx-2"
    >
      <Button type="default">{title}</Button>
    </StyledPopover>
  );
};

export default FilterContainer;
