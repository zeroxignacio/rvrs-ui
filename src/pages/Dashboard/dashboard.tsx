import React, { useCallback, useEffect, useState } from 'react'
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
import { FaAward, FaClipboard, FaExternalLinkSquareAlt } from 'react-icons/fa'
import { Container } from 'react-bootstrap'
import styled, { keyframes } from 'styled-components'
import LayoutContainer from 'components/layout/containers/LayoutContainer'
import Wrap from 'components/layout/containers/Wrap'
import ReactTooltip from 'react-tooltip'
import Tippy from '@tippyjs/react'
import axios from 'axios'
import 'tippy.js/dist/tippy.css'
import { useFarmFromPid, useFarms, usePriceCakeBusd } from 'state/hooks'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import { CoinGeckoClient } from 'coingecko-api-v3'
import PriceChange from 'pages/Dashboard/priceChange'
import ContentCard from 'components/layout/cards/TierCard'
import ContentCardAlt from 'components/layout/cards/ContentCardAlt'
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
  const farms = useFarms()
  const totalSupply = new BigNumber(useTotalSupply())
  const totalSupplyStr = totalSupply
    .div(1e18)
    .toNumber()
    .toLocaleString('en-us', { maximumFractionDigits: 0, minimumFractionDigits: 0 })
  const rvrsPrice = usePriceCakeBusd()
  const rvrsPriceStr = rvrsPrice
    .toNumber()
    .toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
  const circSupply = totalSupply.minus(useNonCirculatingBalance('0xed0b4b0f0e2c17646682fc98ace09feb99af3ade'))
  const marketCap = new BigNumber(circSupply.times(rvrsPrice)).div(1e18)
  const marketCapStr = marketCap
    .toNumber()
    .toLocaleString('en-us', { maximumFractionDigits: 0, minimumFractionDigits: 0 })
  const treasuryUSD = new BigNumber(1481434)
  const ratio = treasuryUSD.div(marketCap).toNumber()
  const ratioStr = ratio.toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
  const farm0 = useFarmFromPid(0)
  const rvrsPerBlock = new BigNumber(farm0.vikingPerBlock)
  const rvrsPerYear = rvrsPerBlock.times(302800).times(52).div(12)
  const inflatioRate = rvrsPerYear
    .div(totalSupply)
    .times(100)
    .toNumber()
    .toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
  const rvrsBalanceNo = getBalanceNumber(useTokenBalance(getCakeAddress()))
  const rvrsBalanceStr = rvrsBalanceNo.toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })

  const Coingecko = async () => {
    const client = new CoinGeckoClient({ autoRetry: true })
    const data = await client.simplePrice({
      ids: 'reverse-protocol',
      vs_currencies: 'usd',
    })
  }

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=reverse-protocol&order=market_cap_desc&per_page=1&page=1&sparkline=false',
      )
      .then((res) => {
        setCoins(res.data)
        console.log(res.data)
      })
      .catch((error) => console.log(error))
  }, [])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <Page>
      <Wrap>
        <LayoutContainer>
          <TitleCard style={{ marginBottom: '8px' }}>
            <TypographyTitle>
              <div>Dashboard</div>&nbsp;&nbsp;
              <a
                target="_blanK"
                rel="noreferrer"
                href={`https://explorer.harmony.one/address/${account}`}
                className="nav-links"
              >
                <Typography>
                  {account.substring(0, 14)}
                  <FaExternalLinkSquareAlt style={{ marginTop: '-2px', marginLeft: '2px' }} />
                </Typography>
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
            <Tippy content="Your current veRVRS cap. To increase it, stake RVRS for veRVRS">
              <ContentCard>
                <TypographyBold style={{ marginBottom: '5px' }}>0.00</TypographyBold>
                <Typography>veRVRS Cap</Typography>
              </ContentCard>
            </Tippy>
          </Flex>
          <Flex justifyContent="center" marginTop="8px">
            <Tippy content="Current RVRS price and price change (as per Coingecko API)">
              <ContentCard style={{ marginRight: '8px' }}>
                <Flex justifyContent="center">
                  <TypographyBold style={{ marginBottom: '5px' }}>${rvrsPriceStr}&nbsp;</TypographyBold>
                  {filteredCoins.map((coin) => {
                    return (
                      <>
                          <>
                            <PriceChange
                              key={coin.id}
                              price={coin.current_price}
                              marketcap={coin.total_volume}
                              volume={coin.market_cap}
                              priceChange={coin.price_change_percentage_24h}
                            />
                          </>
                      </>
                    )
                  })}
                </Flex>
                <Typography>RVRS Price</Typography>
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
                <TypographyBold style={{ marginBottom: '5px' }}>+{inflatioRate}%</TypographyBold>
                <Typography> Monthly Inflation</Typography>
              </ContentCard>
            </Tippy>
          </Flex>
          <Flex justifyContent="center" marginTop="8px">
            <Tippy content="Your current yield boost based on veRVRS balance">
              <ContentCardAlt style={{ marginRight: '8px' }}>
                <TypographyBold style={{ marginBottom: '5px', color: '#6ccca5' }}>+0.00%</TypographyBold>
                <Typography>veRVRS Boost</Typography>
              </ContentCardAlt>
            </Tippy>
            <Tippy content="The Market Cap/Treasury Ratio works as a health indicator for the protocol and its overall participants. When above 1, $1 worth of RVRS gives you access to a +$1 of the treasury">
              {ratio > 0.9 ? (
                <ContentCardAlt>
                  <TypographyBold style={{ marginBottom: '5px', color: '#6ccca5' }}>{ratioStr}</TypographyBold>
                  <Typography>Market Cap/Treasury Ratio</Typography>
                </ContentCardAlt>
              ) : (
                <ContentCardAlt>
                  <TypographyBold style={{ marginBottom: '5px', color: '#eed202' }}>{ratioStr}</TypographyBold>
                  <Typography>Treasury/Market Cap Ratio</Typography>
                </ContentCardAlt>
              )}
            </Tippy>
          </Flex>
          <Divider />
          <Flex justifyContent="center">
            <div style={{ textAlign: 'start', marginBottom: '0px', marginTop: '0px', padding: '0px' }}>
              <Typography style={{ lineHeight: '1.2' }}>
                At current rates, <TypographyBold>TBD&nbsp;</TypographyBold>RVRS is bought by the treasury every week.
                To date, a total of <TypographyBold>TBD&nbsp;</TypographyBold>UST was distributed to protocol
                participants with an average airdrop size of <TypographyBold>TBD</TypographyBold>. Your current airdrop
                share is <TypographyBold>TBD</TypographyBold>.
              </Typography>
            </div>
          </Flex>
        </LayoutContainer>
      </Wrap>
      <Wrap style={{ marginTop: '20px' }}>
        <LayoutContainer style={{ padding: '5px' }}>
          <div
            style={{
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            {/*  eslint-disable-next-line jsx-a11y/iframe-has-title */}
            <iframe
              style={{ width: '800px', height: '400px' }}
              src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRoQmfh6gUgzDmxKROE2SCxe4PRY9xw4xkjCp0VY06zHi3vJbjUbM0nAqWwVj5Yveq6OT7WYzWm4cPM/pubhtml?gid=1376486244&amp;single=true&amp;widget=true&amp;headers=false"
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
const Divider = styled.div`
  background-color: #515151;
  height: 1px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
`

const Typography2 = styled.p`
  font-size: 16px;
  color: #b33f40;
  font-weight: 400;
`

export default Dashboard
