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

const Landing = () => {
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
          <TitleCard style={{ padding: '20px', marginBottom: '8px' }}>
            <TypographyTitle>
              <div>Dashboard</div>&nbsp;
              <a
                href={`https://explorer.harmony.one/address/${account}`}
                className="nav-icon"
                onClick={() => navigator.clipboard.writeText(`${account}`)}
              >
                <Typography>{account.substring(0, 16)}...&nbsp;</Typography>
              </a>
            </TypographyTitle>
          </TitleCard>

          <Flex justifyContent="center">
            <Tippy content="Current veRVRS balance">
              <ContentCard style={{ marginRight: '8px' }}>
                <Skeleton marginBottom="5px" />
                <Typography>veRVRS Balance</Typography>
              </ContentCard>
            </Tippy>
            <Tippy content="Your Reversor tier (more information to be disclosed on the topic)">
              <ContentCard style={{ marginRight: '8px' }}>
                <TypographyBold style={{ marginBottom: '5px' }}>Current Tier</TypographyBold>
                <Typography>
                  Silver Reversor <FaAward />
                </Typography>
              </ContentCard>
            </Tippy>
            <Tippy content="Current RVRS balance">
              <ContentCard>
                <Skeleton marginBottom="5px" />
                <Typography>RVRS Balance</Typography>
              </ContentCard>
            </Tippy>
          </Flex>
          <Flex justifyContent="center" marginTop="8px">
            <Tippy content="Your current veRVRS cap. To increase it, stake RVRS for veRVRS">
              <ContentCard style={{ marginRight: '8px' }}>
                <Skeleton marginBottom="5px" />
                <Typography>veRVRS Cap</Typography>
              </ContentCard>
            </Tippy>
            <Tippy content="Your RVRS portfolio value">
              <ContentCard style={{ marginRight: '8px' }}>
                <Skeleton marginBottom="5px" />
                <Typography>Portfolio Value</Typography>
              </ContentCard>
            </Tippy>
            <Tippy content="Current amount of RVRS staked for veRVRS">
              <ContentCard>
                <Skeleton marginBottom="5px" />
                <Typography>Staked RVRS</Typography>
              </ContentCard>
            </Tippy>
          </Flex>
          <Flex justifyContent="center" marginTop="8px">
            <Tippy content="Your current yield boost based on veRVRS balance">
              <ContentCard style={{ marginRight: '8px' }}>
                <Skeleton marginBottom="5px" />
                <Typography>veRVRS Boost</Typography>
              </ContentCard>
            </Tippy>
            <Tippy content="The treasury portion you are acquiring by buying $1 worth of RVRS">
              <ContentCard>
                <Skeleton marginBottom="5px" />
                <Typography>Market Cap/Treasury Ratio</Typography>
              </ContentCard>
            </Tippy>
          </Flex>
          <Flex justifyContent="center">
            <TitleCard style={{ textAlign: 'start', marginBottom: '0px', marginTop: '8px', padding:'10px' }}>
              <Typography style={{lineHeight:'1.1'}}>
                At current rates, <TypographyBold>TBD&nbsp;</TypographyBold>RVRS is bought by the treasury every week. A
                total of <TypographyBold>TBD&nbsp;</TypographyBold>UST was distributed to protocol participants with an
                average airdrop size of <TypographyBold>TBD</TypographyBold>.
              </Typography>
            </TitleCard>
          </Flex>
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
      {/*
      <Wrap style={{ marginTop: '20px' }}>
        <LayoutContainer style={{ padding: '5px' }}>
          <div
            style={{
              display: 'inline-flex',
              borderRadius: 5,
              overflow: 'hidden',
            }}
          >
            <iframe title='s'
              style={{ width: '590px', height: '300px' }}
              src="https://dexscreener.com/harmony/0xCDe0A00302CF22B3Ac367201FBD114cEFA1729b4?embed=1&theme=dark&trades=0&info=0"
            >
              &nbsp;
            </iframe>
          </div>
        </LayoutContainer>
      </Wrap> */}
    </Page>
  )
}

const ContentCard = styled(Container)`
  text-align: center;
  border-radius: 0px;
  background: #191919;
  padding: 10px;
  border-width: 0px;
  border-color: #313131;
  border-style: solid;
`

export default Landing
