import React from "react";
import styled from "styled-components";
import { CardProps } from "./types";
import CardRibbon from "./CardRibbon";

const InfoBox = styled.div`
  width: auto;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 10px;
  padding: 37px 28px;
  display: flex;
  flex-flow: column;
  justify-content: center;
`;

const NftTitle = styled.p`
  color: #1E2129;
  font-size: 23px;
  font-weight: 700;
  letter-spacing: 0.03em;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NFTPrice = styled.div``;

const BNBPrice = styled.span`
  color: #777;
`;

const USDPrice = styled.span`
  color: #aaa;
`;

const LinkWrap = styled.a`
  width: 420px;
`;

const NFTCard: React.FC<CardProps> = ({
  ribbon,
  isOwned,
  nftTitle,
  nftBnbPrice,
  nftUsdPrice,
  nftImg,
  children,
  ...props
}) => {
  const StyledCard = styled.div`
    background-image: url('${nftImg}');
    background-repeat:no-repeat;
    background-position: center center;
    background-size: cover;
    border-radius: 15px;
    box-shadow: box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    color: "text";
    overflow: hidden;
    position: relative;
    width: 340px;
    padding: 30px;
    padding-top: 210px;
  `;

  return (
    <StyledCard {...props}>
      {isOwned ? <CardRibbon text="Owned NFT" variantColor="primary" /> : ""}
      <InfoBox>
        <NftTitle>{nftTitle}</NftTitle>
        <NFTPrice>
          <BNBPrice>{`${nftBnbPrice} BNB`}</BNBPrice> <USDPrice>{`≈ $${nftBnbPrice}`}</USDPrice>
        </NFTPrice>
      </InfoBox>
    </StyledCard>
  );
};
export default NFTCard;
