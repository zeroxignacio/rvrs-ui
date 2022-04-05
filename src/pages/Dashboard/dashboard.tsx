import React, { useCallback, useState } from 'react'
import Page from 'components/layout/containers/page'
import { Flex } from '@reverse/uikit'
import { useWallet } from "@binance-chain/bsc-use-wallet"
import TypographyTitle from 'components/layout/typography/typographyTitle'
import TypographyBold from 'components/layout/typography/typographyBold'
import Typography from 'components/layout/typography/typography'
import { Skeleton } from 'components/Skeleton'
import TitleCard from 'components/layout/cards/TitleCard'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import { FaAward, FaExternalLinkAlt } from 'react-icons/fa';
import { Container } from 'react-bootstrap'
import styled, { keyframes } from 'styled-components'
import LayoutContainer from 'components/layout/containers/LayoutContainer'
import Wrap from 'components/layout/containers/Wrap'
import TierCard from 'components/layout/cards/TierCard'
import { getBalanceNumber } from "../../utils/formatBalance"

const Dashboard = () => {
  const { account } = useWallet()

  const between = (x: any, min: number, max: number): boolean => {
    return x >= min && x <= max;
  }

  const evaluateTier = (balance: number): number => {
    if (between(balance, 100, 1000)) return 1;
    if (between(balance, 1000, 5000)) return 2;
    if (between(balance, 5000, 10000)) return 3;
    if (balance > 10000) return 4;
    return 0;
  }

  // wallet balance rvrs/vervrs
  const rvrsBalanceNo = getBalanceNumber(useTokenBalance(getCakeAddress()));
  const rvrsBalanceStr = rvrsBalanceNo.toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })

  return (
    <Page>
      <Wrap>
        <LayoutContainer>
          <TitleCard style={{ padding: '20px', marginBottom: '5px' }}>
            <TypographyTitle>
              <div>Dashboard&nbsp;</div>
              <a href={`https://explorer.harmony.one/address/${account}`} className="nav-icon" onClick={() => navigator.clipboard.writeText(`${account}`)}>
                <Typography>{account.substring(0, 16)}...&nbsp;<FaExternalLinkAlt /></Typography>
              </a>
            </TypographyTitle>
          </TitleCard>
          <Flex justifyContent="center">
            <ContentCard style={{ marginRight: '5px' }}>
              <TypographyBold style={{ marginBottom: '5px' }}><Skeleton /></TypographyBold>
              <Typography>veRVRS Balance</Typography>
            </ContentCard>
            <ContentCard style={{ marginRight: '5px' }}>
              <TypographyBold style={{ marginBottom: '5px' }}>Current Tier</TypographyBold>
              <Typography>Silver Reversor <FaAward /></Typography>
            </ContentCard>
            <ContentCard>
              <TypographyBold style={{ marginBottom: '5px' }}><Skeleton /></TypographyBold>
              <Typography>RVRS Balance</Typography>
            </ContentCard>
          </Flex>
          <Flex justifyContent="center" marginTop="5px">
            <ContentCard style={{ marginRight: '5px' }}>
              <TypographyBold style={{ marginBottom: '5px' }}><Skeleton /></TypographyBold>
              <Typography>veRVRS Cap</Typography>
            </ContentCard>
            <ContentCard style={{ marginRight: '5px' }} >
              <TypographyBold style={{ marginBottom: '5px' }}><Skeleton /></TypographyBold>
              <Typography>Portfolio Value</Typography>
            </ContentCard>
            <ContentCard >
              <TypographyBold style={{ marginBottom: '5px' }}><Skeleton /></TypographyBold>
              <Typography>Staked RVRS</Typography>
            </ContentCard>
          </Flex>
          <Flex justifyContent="center" marginTop="5px">
            <ContentCard style={{ marginRight: '5px' }}>
              <TypographyBold style={{ marginBottom: '5px' }}><Skeleton /></TypographyBold>
              <Typography>Expected Yearly Returns</Typography>
            </ContentCard>
            <ContentCard>
              <TypographyBold style={{ marginBottom: '5px' }}><Skeleton /></TypographyBold>
              <Typography>Market Cap/Treasury Ratio</Typography>
            </ContentCard>
          </Flex>
          {/*
          <Flex justifyContent="center" marginTop="5px">
            <ContentCard>
              <TypographyBold style={{ marginBottom: '5px' }}><Skeleton /></TypographyBold>
              <a
                href="https://docs.google.com/spreadsheets/d/1fNsmVWqtPrtZr7z4i2n1ZgRNAEZdX3coPzMbZNPCZ34/edit#gid=1364928066"
                className="nav-icon"
              >
                <LinkTypography>Reverseum Treasury&nbsp;<FaExternalLinkAlt /></LinkTypography>
              </a>
            </ContentCard>
          </Flex>
          */ }
        </LayoutContainer>
      </Wrap>
      <Wrap style={{ marginTop: '20px' }}>
        <LayoutContainer>
          <TitleCard style={{ padding: '20px', marginBottom: '5px', marginTop: '0px' }}>
            <Typography>
              Buybacks and Airdrops
            </Typography>
          </TitleCard>
          <Flex justifyContent="center">
            <ContentCard style={{ textAlign: 'start', marginBottom: '5px' }}>
              <Typography>
                At current rates (and in average), <TypographyBold>TBA&nbsp;</TypographyBold>
                is bought by the treasury every week. This is equivalent to <TypographyBold>TBA&nbsp;</TypographyBold>
                with RVRS at <TypographyBold>TBA</TypographyBold>.
              </Typography>
            </ContentCard>
          </Flex>
          <Flex justifyContent="center">
            <ContentCard style={{textAlign: 'start'}}>
              <Typography>
                Airdrops can be claimed every monday. A total of <TypographyBold>TBA&nbsp;</TypographyBold>UST was distributed to protocol participants.
                Average airdrop size is <TypographyBold>TBA</TypographyBold>
              </Typography>
            </ContentCard>
          </Flex>
        </LayoutContainer>
      </Wrap>
    </Page>
  )
}

const LinkTypography = styled.p`
  transition: all 0.3s ease-in-out;
  font-size: 16px;
  color: #CFCFCF;
  font-weight: 500;
  :hover {
    color: #FFFF !important;
    font-weight: 500;
  } 
`

const ContentCard = styled(Container)`
  text-align: center;
  border-radius: 0px;
  background: #161616;
  padding: 10px;
  border-width: 0px;
  border-color: #313131;
  border-style: solid;
`

export default Dashboard