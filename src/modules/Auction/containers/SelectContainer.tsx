import React, { FC } from 'react';
import { Select } from 'antd';
import styled from 'styled-components';

import useParamRouter from '@/app/hooks/useParamRouter';

interface ISelectContainer {
  placeholder: string;
  queryParamsKey: string;
  options: Array<{
    [key: string]: string | number;
  }>;
}

const StyledSelect = styled(Select)`
  width: 250px;
`;

const SelectContainer: FC<ISelectContainer> = ({
  placeholder = '',
  queryParamsKey = '',
  options = [],
}) => {
  const paramRouter = useParamRouter();

  const handleOnChange = (value: any) => {
    if (value) {
      paramRouter.set({ [queryParamsKey]: value });
    }
  };

  return (
    <StyledSelect
      placeholder={placeholder}
      options={options}
      value={paramRouter[queryParamsKey]}
      onChange={handleOnChange}
    />
  );
};

export default SelectContainer;
