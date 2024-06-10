import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { ConfigProvider } from 'antd';

interface ILayout {
  children: ReactNode;
}

const StyledContainer = styled.div``;

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        hashed: false,
      }}
    >
      <StyledContainer className="px-48 py-32">{children}</StyledContainer>
    </ConfigProvider>
  );
};

export default Layout;
