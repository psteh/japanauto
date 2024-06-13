'use client';

import React, { useEffect, useState } from 'react';
import { notification } from 'antd';

import useToken from '@/app/hooks/useToken';
import useParamRouter from '@/app/hooks/useParamRouter';
import Layout from '@/app/common/components/Layout';
import BrandContainer from '@/modules/Auction/containers/BrandContainer';
import ModelContainer from '@/modules/Auction/containers/ModelContainer';
import BrandLotsContainer from '@/modules/Auction/containers/BrandLotsContainer';

export default function Home({ token }: { token: string }) {
  const { brandName, modelName } = useParamRouter();
  useToken({ token });

  const [tokenKey, setTokenKey] = useState(token);

  useEffect(() => {
    // token might be undefined on page load, get from localStorage if available
    setTokenKey(token ?? window.localStorage.getItem('token'));
  }, [token, setTokenKey]);

  if (!tokenKey) {
    return (
      <Layout>
        <h3>Oops! Looks like something went wrong.</h3>
        <h5>Please refresh the page.</h5>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-16">
        <h3>Step 1: Select brand</h3>
        {tokenKey && <BrandContainer />}
        {brandName && (
          <>
            <h3>Step 2: Select model</h3>
            <ModelContainer />
          </>
        )}
      </div>
      {brandName && modelName && <BrandLotsContainer />}
    </Layout>
  );
}
