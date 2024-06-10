'use client';

import React from 'react';

import useParamRouter from '@/app/hooks/useParamRouter';
import BrandContainer from '@/modules/Auction/containers/BrandContainer';
import ModelContainer from '@/modules/Auction/containers/ModelContainer';
import BrandLotsContainer from '@/modules/Auction/containers/BrandLotsContainer';

export default function Home({ token }: { token: string }) {
  const { brandName, modelName } = useParamRouter();

  return (
    <>
      <div className="mb-16">
        {token && <BrandContainer />}
        {brandName && <ModelContainer />}
      </div>
      {brandName && modelName && <BrandLotsContainer />}
    </>
  );
}
