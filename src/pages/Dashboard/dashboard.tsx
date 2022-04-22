
import React, { useCallback, useState } from 'react'
import BigNumber from 'bignumber.js'
import Page from 'components/layout/containers/page'
import { Flex } from '@reverse/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import TypographyTitle from 'components/layout/typography/typographyTitle'
import TypographyBold from 'components/layout/typography/typographyBold'
import Typography from 'components/layout/typography/typography'
import { Skeleton } from 'components/Skeleton'
import TitleCard from 'components/layout/cards/TitleCard'
import useTokenBalance, { useBurnedBalance, useNonCirculatingBalance, useTotalSupply } from 'hooks/useTokenBalance'
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
import { useFarmFromPid, useFarms, usePriceCakeBusd } from 'state/hooks'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
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
  const farms = useFarms();
  const totalSupply = new BigNumber(useTotalSupply())
  const totalSupplyStr = totalSupply.div(1e18).toNumber().toLocaleString('en-us', { maximumFractionDigits: 0, minimumFractionDigits: 0 })
  const rvrsPrice = usePriceCakeBusd()
  const circSupply = totalSupply.minus(useNonCirculatingBalance('0xed0b4b0f0e2c17646682fc98ace09feb99af3ade'))
  const marketCap = new BigNumber(circSupply.times(rvrsPrice)).div(1e18)
  const marketCapStr = marketCap.toNumber().toLocaleString('en-us', { maximumFractionDigits: 0, minimumFractionDigits: 0 })
  const treasuryUSD = new BigNumber(1481434)
  const ratio =  treasuryUSD.div(marketCap).toNumber()
  const ratioStr = ratio.toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
  const farm0 = useFarmFromPid(0);
  const rvrsPerBlock = new BigNumber(farm0.vikingPerBlock)
  const rvrsPerYear = rvrsPerBlock.times(302800).times(52).div(12)
  const inflatioRate = rvrsPerYear.div(totalSupply).times(100).toNumber().toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
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
                <TypographyBold style={{ marginBottom: '5px' }}>0.00</TypographyBold>
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
                <TypographyBold style={{ marginBottom: '5px' }}>{rvrsBalanceStr}</TypographyBold>
                <Typography>RVRS Balance</Typography>
              </ContentCard>
            </Tippy>
          </Flex>
          <Flex justifyContent="center" marginTop="8px">
            <Tippy content="Your current veRVRS cap. To increase it, stake RVRS for veRVRS">
              <ContentCard style={{ marginRight: '8px' }}>
                <TypographyBold style={{ marginBottom: '5px' }}>0.00</TypographyBold>
                <Typography>veRVRS Cap</Typography>
              </ContentCard>
            </Tippy>
            <Tippy content="Current RVRS market cap, calculated as: [(Supply - Noncirculating tokens) * Price]">
              <ContentCard style={{ marginRight: '8px' }}>
                <TypographyBold style={{ marginBottom: '5px' }}>${marketCapStr}</TypographyBold>
                <Typography>Market Cap</Typography>
              </ContentCard>
            </Tippy>
            <Tippy content="The rate at which RVRS is being emitted monthly">
              <ContentCard>
                <TypographyBold style={{ marginBottom: '5px'}}>+{inflatioRate}%</TypographyBold>
                <Typography> Monthly Inflation</Typography>
              </ContentCard>
            </Tippy>
          </Flex>
          <Flex justifyContent="center" marginTop="8px">
            <Tippy content="Your current yield boost based on veRVRS balance">
              <ContentCard style={{ marginRight: '8px' }}>
                <TypographyBold style={{ marginBottom: '5px', color: '#6ccca5' }}>+0.00%</TypographyBold>
                <Typography>veRVRS Boost</Typography>
              </ContentCard>
            </Tippy>
            <Tippy content="The treasury portion you are acquiring by buying $1 worth of RVRS">
              {ratio > 0.9 ?
              <ContentCard>
                <TypographyBold style={{ marginBottom: '5px', color: '#6ccca5' }}>{ratioStr}</TypographyBold>
                <Typography>Market Cap/Treasury Ratio</Typography>
              </ContentCard>
              :
              <ContentCard>
              <TypographyBold style={{ marginBottom: '5px', color: '#eed202' }}>{ratioStr}</TypographyBold>
              <Typography>Treasury/Market Cap Ratio</Typography>
            </ContentCard>
              }       
            </Tippy>
          </Flex>
          <Flex justifyContent="center">
            <TitleCard style={{ textAlign: 'start', marginBottom: '0px', marginTop: '8px', padding: '10px' }}>
              <Typography style={{ lineHeight: '1.1' }}>
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

export default Dashboard
