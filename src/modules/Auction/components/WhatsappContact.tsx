import React, { FC } from 'react';
import { Affix, Button } from 'antd';
import styled from 'styled-components';
import { WhatsAppOutlined } from '@ant-design/icons';

interface IWhatsappContact {}

const StyledAffix = styled(Affix)`
  position: absolute;
  right: 50px;
`;

const StyledButton = styled(Button)`
  background-color: #25d366;
  padding: 8px 16px;
  width: auto;
  height: auto;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;

  &:hover {
    color: #ffffff !important;
    border-color: #25d366 !important;
    background: #25d366 !important;
  }

  .button-text {
    margin-left: 16px;
    color: #fff;
  }
`;

const WhatsappContact: FC<IWhatsappContact> = () => {
  const handleOnClick = () => {
    const message = encodeURI(window.location.href);
    window.open(
      `https://wa.me/${process.env.WHATSAPP_PHONE_NUMBER}?text=${message}`,
      '_blank',
    );
  };

  return (
    <StyledAffix offsetBottom={50}>
      <StyledButton type="default" onClick={handleOnClick}>
        <WhatsAppOutlined style={{ fontSize: 32, color: '#ffffff' }} />
        <div className="button-text">
          Whatsapp me for <br /> more information
        </div>
      </StyledButton>
    </StyledAffix>
  );
};

export default WhatsappContact;
