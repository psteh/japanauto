import React, { FC, useEffect, useState, useCallback } from 'react';
import { notification } from 'antd';

import useParamRouter from '@/app/hooks/useParamRouter';
import { getModelsByBrandName } from '@/modules/Auction/api';
import SelectContainer from '@/modules/Auction/containers/SelectContainer';

interface IModelContainer {}

const ModelContainer: FC<IModelContainer> = () => {
  const { brandName } = useParamRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [models, setModels] = useState<
    Array<{ modelName: string; totalQty: number }>
  >([]);
  const [options, setOptions] = useState<
    Array<{ label: string; value: string }>
  >([]);

  const fetchAllModels = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getModelsByBrandName(brandName);

      const options = res.data.map((d: { [key: string]: string }) => {
        return { label: d.modelName, value: d.modelName };
      });

      setModels(res.data);
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
  }, [brandName]);

  useEffect(() => {
    fetchAllModels();
  }, [brandName, fetchAllModels]);

  return (
    <SelectContainer
      placeholder="Select models"
      queryParamsKey="modelName"
      options={options}
    />
  );
};

export default ModelContainer;
