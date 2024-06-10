import React, { FC, useEffect, useState, useCallback } from 'react';
import { notification } from 'antd';
import styled from 'styled-components';

import { getAllBrands } from '@/modules/Auction/api';
import SelectContainer from '@/modules/Auction/containers/SelectContainer';

interface IBrandContainer {}

const StyledContainer = styled.span`
  margin-right: 8px;
`;

const BrandContainer: FC<IBrandContainer> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState<
    Array<{ modelName: string; totalQty: number }>
  >([]);
  const [options, setOptions] = useState<
    Array<{ label: string; value: string }>
  >([]);

  const fetchAllBrands = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getAllBrands();

      const options = res.data.map((d: { [key: string]: string }) => {
        return { label: d.brandName, value: d.brandName };
      });

      setBrands(res.data);
      setOptions(options);
    } catch (error) {
      console.log(error);
      notification.error({
        message: 'Oops! Looks like something went wrong.',
        description: 'Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllBrands();
  }, [fetchAllBrands]);

  return (
    <StyledContainer className="">
      <SelectContainer
        placeholder="Select brands"
        queryParamsKey="brandName"
        options={options}
      />
    </StyledContainer>
  );
};

export default BrandContainer;
