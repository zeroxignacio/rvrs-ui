import React from "react";
import styled from "styled-components";
import { localStorageKey } from "./config";
import { Login, Config } from "./types";

interface Props {
  walletConfig: Config;
  login: Login;
  onDismiss: () => void;
  mb: string;
}

const WalletCard: React.FC<Props> = ({ login, walletConfig, onDismiss, mb }) => {
  const { title, icon: Icon } = walletConfig;
  return (
    <ConnectButton
      onClick={() => {
        login(walletConfig.connectorId);
        window.localStorage.setItem(localStorageKey, "1");
        onDismiss();
      }}
      style={{ justifyContent: "space-between" }}
      id={`wallet-connect-${title.toLocaleLowerCase()}`}
    >
      <Txt style={{ justifyContent: "space-between" }}>
        {title}
        <Icon width="40px" marginLeft="150px" />
      </Txt>
      
    </ConnectButton>

  );
};

const Txt = styled.p`
    font-size: 18px;
    font-weight: 700;
    color: #506063;
`

const ConnectButton = styled.button`
    font-size: 18px;
    font-weight: 600;
    padding: 6px;
    background: #FFFF;
    border: 0px;
    transition: 0.3s ease-in-out;
    :hover {
      opacity: 0.8;
      border-radius: 10px;
    }
    min-width: 300px;
`

export default WalletCard;
