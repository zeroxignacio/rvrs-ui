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
    <SButton
      onClick={() => {
        login(walletConfig.connectorId);
        window.localStorage.setItem(localStorageKey, "1");
        onDismiss();
      }}
      style={{ justifyContent: "space-between" }}
      id={`wallet-connect-${title.toLocaleLowerCase()}`}
    >
        {title}
        <Icon width="40px" marginLeft="160px" />
      
    </SButton>

  );
};

const Txt = styled.p`
    font-size: 18px;
    font-weight: 700;
    color: #506063;
    color: white;
`

const ConnectButton = styled.button`
    font-size: 18px;
    font-weight: 600;
    padding: 6px;
    background: transparent;
    border: 1px;
    transition: 0.3s ease-in-out;
    :hover {
      opacity: 1;
      border-radius: 0px;
      background: #FFFF;
    }
    min-width: 330px;
`

const SButton = styled.button`
    font-size: 16px;
    font-weight: 400;
    background: transparent;
    color: #EEEEEE;
    min-width: 300px;
    border: 1px solid;
    justify-content: center;
    padding: 3px;
    transition: 0.3s ease-in-out;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 600;
    color: #506063;
    color: white;
    background: #FFFF;
    color: #121212;
    :hover {
      background: #121212;
      color: white;

    } 
`

export default WalletCard;
