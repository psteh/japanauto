import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { ConfigProvider } from 'antd';

interface ILayout {
  children: ReactNode;
}

const StyledContainer = styled.div`
  background-color: #f4f6f6;
`;

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        hashed: false,
      }}
    >
      <StyledContainer className="px-32 py-24">{children}</StyledContainer>
    </ConfigProvider>
  );
};

export default Layout;
