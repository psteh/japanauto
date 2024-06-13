import React, { FC } from 'react';
import { Select } from 'antd';
import styled from 'styled-components';

interface ISelectComponent {
  placeholder?: string;
  value?: string | number;
  options?: Array<{
    [key: string]: string | number;
  }>;
  onChange?: () => void;
}

const StyledSelect = styled(Select)`
  width: 100%;
`;

const SelectComponent: FC<ISelectComponent> = ({
  placeholder = '',
  value = '',
  options = [],
  onChange = () => {},
}) => {
  return (
    <StyledSelect
      placeholder={placeholder}
      options={options}
      value={value}
      onChange={onChange}
    />
  );
};

export default SelectComponent;
