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
import useTokenBalance, {
  useBurnedBalance,
  useLpBalance,
  useLpBalance2,
  useLpBalance3,
  useNonCirculatingBalance,
  useStakedBalance,
  useTotalSupply,
} from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import { FaAward, FaClipboard, FaExternalLinkSquareAlt, FaQuestion, FaQuestionCircle } from 'react-icons/fa'
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
import GradientCard from 'components/layout/cards/GradientCard'
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
  const totalSupply = new BigNumber(useTotalSupply())
  const totalSupplyStr = totalSupply
    .div(1e18)
    .toNumber()
    .toLocaleString('en-us', { maximumFractionDigits: 0, minimumFractionDigits: 0 })
  const rvrsPrice = usePriceCakeBusd()
  const rvrsPriceStr = rvrsPrice
    .toNumber()
    .toLocaleString('en-us', { maximumFractionDigits: 3, minimumFractionDigits: 3 })
  const circSupply = totalSupply
    .minus(useNonCirculatingBalance('0xed0b4b0f0e2c17646682fc98ace09feb99af3ade'))
    .minus(useBurnedBalance('0xed0b4b0f0e2c17646682fc98ace09feb99af3ade'))
  const lpBalance = useLpBalance('0xed0b4b0f0e2c17646682fc98ace09feb99af3ade')
    .plus(useLpBalance2('0xed0b4b0f0e2c17646682fc98ace09feb99af3ade'))
    .plus(useLpBalance3('0xed0b4b0f0e2c17646682fc98ace09feb99af3ade'))
  const stakedBalanceStr = useStakedBalance('0xed0b4b0f0e2c17646682fc98ace09feb99af3ade')
    .div(circSupply)
    .times(100)
    .toNumber()
    .toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
  const marketCap = new BigNumber(circSupply.times(rvrsPrice)).div(1e18)
  const marketCapNoLp = new BigNumber(circSupply.minus(lpBalance).times(rvrsPrice)).div(1e18)
  const marketCapStr = marketCap
    .toNumber()
    .toLocaleString('en-us', { maximumFractionDigits: 0, minimumFractionDigits: 0 })

  const treasuryUSD = new BigNumber(1300000) // get this from spreadsheet
  const ratio = treasuryUSD.div(marketCapNoLp).toNumber()
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
          <TitleCard style={{ marginBottom: '10px' }}>
            <TypographyTitle>Liquidity Opportunities</TypographyTitle>
          </TitleCard>
          <Flex justifyContent="center" marginBottom="10px">
            <ContentCard style={{ marginRight: '10px', padding: '16px' }}>
              <TypographyBold style={{ marginBottom: '5px' }}>TBD</TypographyBold>
              <Typography>Fees Earned</Typography>
            </ContentCard>
            <GradientCard style={{ marginRight: '10px', padding: '16px' }}>
              <TypographyBold style={{ marginBottom: '5px' }}>TBD</TypographyBold>
              <Typography>Total Liquidity</Typography>
            </GradientCard>
            <ContentCard style={{ marginRight: '0px', padding: '16px' }}>
              <TypographyBold style={{ marginBottom: '5px' }}>TBD</TypographyBold>
              <Typography>Volume (24H)</Typography>
            </ContentCard>
          </Flex>
          <a target="_blanK" rel="noreferrer" href="https://app.sushi.com/" className="nav-links">
            <LpContainer>
              <Flex alignItems="center" justifyContent="space-between">
                <Flex alignItems="center">
                  <img
                    width="60px"
                    style={{ marginRight: '8px' }}
                    className="img-fluid"
                    src={`${process.env.PUBLIC_URL}/images/farms/rvrsust.svg`}
                    alt="logo"
                  />
                  <Flex flexDirection="column">
                    <Typography style={{ color: 'white' }}>RVRS/UST</Typography>
                    <TypographySmall>Core</TypographySmall>
                  </Flex>
                </Flex>
                <Flex flexDirection="column">
                  <Typography style={{ color: '#CA57A5' }}>Sushi</Typography>
                  <TypographySmall>Platform</TypographySmall>
                </Flex>
                <Flex flexDirection="column">
                  <Typography style={{ color: 'white' }}>TBD</Typography>
                  <TypographySmall>Liquidity</TypographySmall>
                </Flex>
                <Flex flexDirection="column">
                  <Typography style={{ color: 'white' }}>TBD</Typography>
                  <TypographySmall>APR</TypographySmall>
                </Flex>
              </Flex>
            </LpContainer>
          </a>
          <a target="_blanK" rel="noreferrer" href="https://app.sushi.com/" className="nav-links">
            <LpContainer>
              <Flex alignItems="center" justifyContent="space-between">
                <Flex alignItems="center">
                  <img
                    width="60px"
                    style={{ marginRight: '8px' }}
                    className="img-fluid"
                    src={`${process.env.PUBLIC_URL}/images/farms/rvrsone.svg`}
                    alt="logo"
                  />
                  <Flex flexDirection="column">
                    <Typography style={{ color: 'white' }}>RVRS/ONE</Typography>
                    <TypographySmall>Core</TypographySmall>
                  </Flex>
                </Flex>
                <Flex flexDirection="column">
                  <Typography style={{ color: '#CA57A5' }}>Sushi</Typography>
                  <TypographySmall>Platform</TypographySmall>
                </Flex>
                <Flex flexDirection="column">
                  <Typography style={{ color: 'white' }}>TBD</Typography>
                  <TypographySmall>Liquidity</TypographySmall>
                </Flex>
                <Flex flexDirection="column">
                  <Typography style={{ color: 'white' }}>TBD</Typography>
                  <TypographySmall>APR</TypographySmall>
                </Flex>
              </Flex>
            </LpContainer>
          </a>
          <a target="_blanK" rel="noreferrer" href="https://app.sushi.com/" className="nav-links">
            <LpContainer>
              <Flex alignItems="center" justifyContent="space-between">
                <Flex alignItems="center">
                  <img
                    width="60px"
                    style={{ marginRight: '8px' }}
                    className="img-fluid"
                    src={`${process.env.PUBLIC_URL}/images/farms/rvrsust.svg`}
                    alt="logo"
                  />
                  <Flex flexDirection="column">
                    <Typography style={{ color: 'white' }}>RVRS/UST</Typography>
                    <TypographySmall>Community</TypographySmall>
                  </Flex>
                </Flex>
                <Flex flexDirection="column">
                  <Typography style={{ color: '#8C3DF5' }}>Foxswap</Typography>
                  <TypographySmall>Platform</TypographySmall>
                </Flex>
                <Flex flexDirection="column">
                  <Typography style={{ color: 'white' }}>TBD</Typography>
                  <TypographySmall>Liquidity</TypographySmall>
                </Flex>
                <Flex flexDirection="column">
                  <Typography style={{ color: 'white' }}>TBD</Typography>
                  <TypographySmall>APR</TypographySmall>
                </Flex>
              </Flex>
            </LpContainer>
          </a>
          <a target="_blanK" rel="noreferrer" href="https://app.sushi.com/" className="nav-links">
            <LpContainer>
              <Flex alignItems="center" justifyContent="space-between">
                <Flex alignItems="center">
                  <img
                    width="60px"
                    style={{ marginRight: '8px' }}
                    className="img-fluid"
                    src={`${process.env.PUBLIC_URL}/images/farms/rvrsusdc.svg`}
                    alt="logo"
                  />
                  <Flex flexDirection="column">
                    <Typography style={{ color: 'white' }}>RVRS/USDC</Typography>
                    <TypographySmall>Secondary</TypographySmall>
                  </Flex>
                </Flex>
                <Flex flexDirection="column">
                  <Typography style={{ color: '#CA57A5' }}>Sushi</Typography>
                  <TypographySmall>Platform</TypographySmall>
                </Flex>
                <Flex flexDirection="column">
                  <Typography style={{ color: 'white' }}>TBD</Typography>
                  <TypographySmall>Liquidity</TypographySmall>
                </Flex>
                <Flex flexDirection="column">
                  <Typography style={{ color: 'white' }}>TBD</Typography>
                  <TypographySmall>APR</TypographySmall>
                </Flex>
              </Flex>
            </LpContainer>
          </a>
        </LayoutContainer>
      </Wrap>
      <Wrap style={{ marginTop: '20px' }}>
        <LayoutContainer>
          <Flex>
            <Typography style={{ lineHeight: '1.1' }}>
              Liquidity providers earn fees from swaps and protocol incentives.
            </Typography>
          </Flex>
        </LayoutContainer>
      </Wrap>
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

const LpContainer = styled.div`
  border-radius: 5px;
  padding: 8px;
  transition: all 0.3s ease-in-out;
  border-width: 1px;
  border-style: solid;
  border-color: #3a3a3a;
  margin-top: 10px;
  background: #181818;
  :hover {
    opacity: 0.8;
  }
`

const MainLpContainer = styled.div`
  border-radius: 0px;
  padding: 8px;
  transition: all 0.3s ease-in-out;
  border-width: 1px;
  border-style: solid;
  border-color: #6699a3;
  margin-top: 10px;
  background: #181818;
  :hover {
    opacity: 0.8;
  }
`

const TypographySmall = styled.p`
  font-size: 14px;
  color: #9b9b9b;
  font-weight: 400;
  min-width: 90px;
  max-width: 90px;
  margin-top: 3px;
`

export default Dashboard
