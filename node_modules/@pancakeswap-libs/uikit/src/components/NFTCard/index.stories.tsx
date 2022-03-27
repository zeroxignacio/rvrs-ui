import React from "react";
import styled from "styled-components";
/* eslint-disable import/no-unresolved */
import { Meta } from "@storybook/react/types-6-0";
import NFTCard from "./NFTCard";

const Row = styled.div`
  margin-bottom: 32px;
`;

const FlexRow = styled.div`
  display: flex;
  width: 100%;
  background-color: #fff;
  flex-flow: row;
  justify-content: space-around;
`;

export default {
  title: "Components/NFTCard",
  component: NFTCard,
  argTypes: {},
} as Meta;

export const Default: React.FC = () => {
  return (
    <FlexRow>
      <NFTCard
        nftTitle="NFT TITLE"
        nftImg="https://static.wixstatic.com/media/4cbe8d_f1ed2800a49649848102c68fc5a66e53~mv2.gif"
        nftId={1}
        nftBnbPrice="123"
        nftUsdPrice="123"
        isOwned
      />
      <NFTCard
        nftTitle="NFT TITLE"
        nftImg="https://static.wixstatic.com/media/4cbe8d_f1ed2800a49649848102c68fc5a66e53~mv2.gif"
        nftId={1}
        nftBnbPrice="123"
        nftUsdPrice="123"
      />
      <NFTCard
        nftTitle="NFT TITLE"
        nftImg="https://static.wixstatic.com/media/4cbe8d_f1ed2800a49649848102c68fc5a66e53~mv2.gif"
        nftId={1}
        nftBnbPrice="123"
        nftUsdPrice="123"
      />
      <NFTCard
        nftTitle="NFT TITLE"
        nftImg="https://static.wixstatic.com/media/4cbe8d_f1ed2800a49649848102c68fc5a66e53~mv2.gif"
        nftId={1}
        nftBnbPrice="123"
        nftUsdPrice="123"
      />
    </FlexRow>
  );
};
