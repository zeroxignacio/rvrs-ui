import React, { useCallback, useState } from 'react'
import Page from 'components/layout/containers/page'
import { Flex } from '@reverse/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import TypographyTitle from 'components/layout/typography/typographyTitle'
import TypographyBold from 'components/layout/typography/typographyBold'
import Typography from 'components/layout/typography/typography'
import { Skeleton } from 'components/Skeleton'
import TitleCard from 'components/layout/cards/TitleCard'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import { FaAward } from 'react-icons/fa'
import { Container } from 'react-bootstrap'
import styled, { keyframes } from 'styled-components'
import LayoutContainer from 'components/layout/containers/LayoutContainer'
import Wrap from 'components/layout/containers/Wrap'
import TierCard from 'components/layout/cards/TierCard'
import ReactTooltip from 'react-tooltip'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import { getBalanceNumber } from '../../utils/formatBalance'

const Dashboard = () => {
  const { account } = useWallet()

  const between = (x: any, min: number, max: number): boolean => {
    return x >= min && x <= max
  }

  const evaluateTier = (balance: number): number => {
    if (between(balance, 100, 1000)) return 1
    if (between(balance, 1000, 5000)) return 2
    if (between(balance, 5000, 10000)) return 3
    if (balance > 10000) return 4
    return 0
  }

  // wallet balance rvrs/vervrs
  const rvrsBalanceNo = getBalanceNumber(useTokenBalance(getCakeAddress()))
  const rvrsBalanceStr = rvrsBalanceNo.toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })

  return (
    <Page>
      <Wrap>
        <LayoutContainer>
          <TitleCard style={{ padding: '20px', marginBottom: '5px' }}>
            <TypographyTitle>
              <div>Dashboard</div>
              {/* 
              <a href={`https://explorer.harmony.one/address/${account}`} className="nav-icon" onClick={() => navigator.clipboard.writeText(`${account}`)}>
                <Typography>{account.substring(0, 16)}...&nbsp;<FaExternalLinkAlt /></Typography>
              </a> */}
            </TypographyTitle>
          </TitleCard>

          <Flex justifyContent="center">
            <ContentCard style={{ marginRight: '5px' }}>
              <Skeleton marginBottom="5px" />
              <Typography>veRVRS Balance</Typography>
            </ContentCard>
            <ContentCard style={{ marginRight: '5px' }}>
              <TypographyBold style={{ marginBottom: '5px' }}>Current Tier</TypographyBold>
              <Typography>
                Silver Reversor <FaAward />
              </Typography>
            </ContentCard>
            <ContentCard>
              <Skeleton marginBottom="5px" />
              <Typography>RVRS Balance</Typography>
            </ContentCard>
          </Flex>
          <Flex justifyContent="center" marginTop="5px">
            <ContentCard style={{ marginRight: '5px' }}>
              <Skeleton marginBottom="5px" />
              <Typography>veRVRS Cap</Typography>
            </ContentCard>
            <ContentCard style={{ marginRight: '5px' }}>
              <Skeleton marginBottom="5px" />
              <Typography>Portfolio Value</Typography>
            </ContentCard>
            <ContentCard>
              <Skeleton marginBottom="5px" />
              <Typography>Staked RVRS</Typography>
            </ContentCard>
          </Flex>
          <Flex justifyContent="center" marginTop="5px">
            <ContentCard style={{ marginRight: '5px' }}>
              <Skeleton marginBottom="5px" />
              <Typography>Expected Yearly Returns</Typography>
            </ContentCard>
            <ContentCard>
              <Skeleton marginBottom="5px" />
              <Typography>Market Cap/Treasury Ratio</Typography>
            </ContentCard>
          </Flex>
          <Flex justifyContent="center">
            <ContentCard style={{ textAlign: 'start', marginBottom: '5px', marginTop: '10px' }}>
              <Typography>
                At current rates (and in average), <TypographyBold>TBD&nbsp;</TypographyBold>RVRS is bought by the
                treasury every week. This is equivalent to <TypographyBold>TBD&nbsp;</TypographyBold>
                with RVRS at <TypographyBold>TBD</TypographyBold>. 
              </Typography>
            </ContentCard>
          </Flex>
          <Flex justifyContent="center">
            <ContentCard style={{ textAlign: 'start' }}>
              <Typography>
                A total of <TypographyBold>TBD&nbsp;</TypographyBold>UST was
                distributed to protocol participants with an average airdrop size is <TypographyBold>TBD</TypographyBold>
              </Typography>
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
          */}
        </LayoutContainer>
      </Wrap>
      <Wrap style={{ marginTop: '20px' }}>
        <LayoutContainer style={{ padding: '5px' }}>
          <div
            style={{
              display: 'inline-flex',
              borderRadius: 5,
              overflow: 'hidden',
            }}
          >
            {/*  eslint-disable-next-line jsx-a11y/iframe-has-title */}
            <iframe
              style={{ width: '590px', height: '400px' }}
              src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS44_dnMXBvCVYrTCEaQ1egJS2SAePHobU4aHI01iX6InYDjdIaSuW83NrZMJbGR976nCN45cK9QXbC/pubhtml?widget=true&amp;headers=false"
            >
              &nbsp;
            </iframe>
            
          </div>
        </LayoutContainer>
      </Wrap>

      <Wrap style={{ marginTop: '20px' }}>
        <LayoutContainer style={{ padding: '5px' }}>
          <div
            style={{
              display: 'inline-flex',
              borderRadius: 5,
              overflow: 'hidden',
            }}
          >
            {/*  eslint-disable-next-line jsx-a11y/iframe-has-title */}
            <iframe
              style={{ width: '590px', height: '300px' }}
              src="https://dexscreener.com/harmony/0xCDe0A00302CF22B3Ac367201FBD114cEFA1729b4?embed=1&theme=dark&trades=0&info=0"
            >
              &nbsp;
            </iframe>
          </div>
        </LayoutContainer>
      </Wrap>
    </Page>
  )
}

const LinkTypography = styled.p`
  transition: all 0.3s ease-in-out;
  font-size: 16px;
  color: #cfcfcf;
  font-weight: 500;
  :hover {
    color: #ffff !important;
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
