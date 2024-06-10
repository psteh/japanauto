'use client';

import React, { useEffect, useCallback, useState } from 'react';
import { ConfigProvider, notification } from 'antd';
import styled from 'styled-components';

import useParamRouter from '@/app/hooks/useParamRouter';
import { login } from '@/modules/Auction/api';
import BrandContainer from '@/modules/Auction/containers/BrandContainer';
import ModelContainer from '@/modules/Auction/containers/ModelContainer';
import BrandLotsContainer from '@/modules/Auction/containers/BrandLotsContainer';
import useToken from '@/app/hooks/useToken';

const StyledSearchContainer = styled.div``;

export default function Home() {
  const { brandName, modelName } = useParamRouter();
  const { token, setToken } = useToken();

  // const [authorized, setAuthorized] = useState<boolean>(false);

  const handleLogin = useCallback(async () => {
    if (!token) {
      try {
        const res = await login();
        setToken(res?.data?.token);

        return res?.data?.token;
      } catch (error) {
        console.log(error);
        notification.error({
          message: 'Oops! Looks like something went wrong.',
          description: 'Please try again.',
        });
      }
    }
  }, [token, setToken]);

  const initialize = useCallback(async () => {
    await handleLogin();
  }, [handleLogin]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // useEffect(() => {
  //   if (!authorized) {
  //     const password = window.prompt('Password');
  //     setAuthorized(password === process.env.NEXT_PUBLIC_VISITOR_PASSWORD);
  //   }
  // }, [authorized]);

  // if (!authorized) {
  //   return <>You have no access to the page</>;
  // }

  return (
    <ConfigProvider theme={{ hashed: false }}>
      <main className=" pt-36 pb-16">
        <StyledSearchContainer className="mb-16">
          {token && <BrandContainer />}
          {brandName && <ModelContainer />}
        </StyledSearchContainer>
        {brandName && modelName && <BrandLotsContainer />}
      </main>
    </ConfigProvider>
  );
}
