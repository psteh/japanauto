import React, { FC } from 'react';
import styled from 'styled-components';

import useParamRouter from '@/app/hooks/useParamRouter';
import { IAuctionFilters } from '@/app/interfaces/Auction';
import { EFilterTypes } from '@/app/constants';
import {
  convertArrayToOptions,
  convertArrayToSliderMark,
} from '@/app/utils/OptionUtils';
import Filter from '@/app/common/containers/Filter';

interface IFilterContainer {
  filters?: IAuctionFilters;
}

const StyledFilterContainer = styled.div`
  width: 100%;
`;

const FilterContainer: FC<IFilterContainer> = ({ filters }) => {
  const { auctionDate, engineCapacity, color, transmission, mileage } =
    useParamRouter();

  const filtersSetting = [
    {
      id: 'auctionDate',
      type: EFilterTypes.SELECT,
      title: 'Auction Date',
      placeholder: 'Auction Date',
      value: auctionDate,
      options: convertArrayToOptions(filters?.auctionDates),
    },
    {
      id: 'engineCapacity',
      type: EFilterTypes.SELECT,
      title: 'Engine Capacity',
      placeholder: 'Engine Capacity',
      value: engineCapacity,
      options: convertArrayToOptions(filters?.engineSizeCc),
    },
    {
      id: 'color',
      type: EFilterTypes.SELECT,
      title: 'Color',
      placeholder: 'Color',
      value: color,
      options: convertArrayToOptions(filters?.exteriorColorNames),
    },
    {
      id: 'mileage',
      type: EFilterTypes.SELECT,
      title: 'Mileage',
      placeholder: 'Mileage',
      value: mileage,
      options: convertArrayToOptions(filters?.providerMileage),
    },
    {
      id: 'transmission',
      type: EFilterTypes.SELECT,
      title: 'Transmission',
      placeholder: 'Transmission',
      value: transmission,
      options: convertArrayToOptions(filters?.transmissionTypes),
    },
    {
      id: 'manufactureYear',
      type: EFilterTypes.SLIDER,
      title: 'Manufacture Year',
      marks: convertArrayToSliderMark(filters?.yearOfProduction),
    },
  ];

  return (
    <StyledFilterContainer>
      {filtersSetting.map((setting) => (
        <Filter
          {...setting}
          key={setting.id}
          id={setting.id}
          type={setting.type}
        />
      ))}
    </StyledFilterContainer>
  );
};

export default FilterContainer;
