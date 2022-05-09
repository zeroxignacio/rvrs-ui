import React from 'react'
import Page from 'components/layout/containers/page'
import { Flex } from '@reverse/uikit'
import TypographyTitle from 'components/layout/typography/typographyTitle'
import TypographyBold from 'components/layout/typography/typographyBold'
import Typography from 'components/layout/typography/typography'
import TitleCard from 'components/layout/cards/TitleCard'
import styled from 'styled-components'
import LayoutContainer from 'components/layout/containers/LayoutContainer'
import Wrap from 'components/layout/containers/Wrap'
import 'tippy.js/dist/tippy.css'
import ContentCard from 'components/layout/cards/TierCard'
import GradientCard from 'components/layout/cards/GradientCard'
import { usePriceCakeBusd } from 'state/hooks'
import { useLpBalance, useLpBalance2, useLpBalance3, useLpBalance4 } from 'hooks/useTokenBalance'
import BigNumber from 'bignumber.js'

const Liquidity = () => {
  // a mvp implementation of the liquidity page...
  const rvrsPrice = usePriceCakeBusd()

  // get tvl
  const oneRvrsTvl = useLpBalance('0xed0b4b0f0e2c17646682fc98ace09feb99af3ade').times(2).times(rvrsPrice)
  const ustRvrsTvl = useLpBalance2('0xed0b4b0f0e2c17646682fc98ace09feb99af3ade').times(2).times(rvrsPrice)
  const ethRvrsTvl = useLpBalance3('0xed0b4b0f0e2c17646682fc98ace09feb99af3ade').times(2).times(rvrsPrice)
  const usdcRvrsTvl = useLpBalance4('0xed0b4b0f0e2c17646682fc98ace09feb99af3ade').times(2).times(rvrsPrice)
  const totalTvl = oneRvrsTvl.plus(ustRvrsTvl).plus(ethRvrsTvl).plus(usdcRvrsTvl)

  // get volume
  const totalDailyVolume = new BigNumber(0)

  // calculate fees by using volume
  const totalDailyFees = totalDailyVolume.times(0.025)

  // calculate apr
  const totalApr = totalDailyFees.div(totalTvl).times(365).times(100)

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
              <Typography>Fees (24H)</Typography>
            </ContentCard>
            <GradientCard style={{ marginRight: '10px', padding: '16px' }}>
              <TypographyBold style={{ marginBottom: '5px' }}>
                ${totalTvl.div(1e18).toNumber().toLocaleString('en-us', { maximumFractionDigits: 0 })}
              </TypographyBold>
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
                  <Typography style={{ color: 'white' }}>
                    ${ustRvrsTvl.div(1e18).toNumber().toLocaleString('en-us', { maximumFractionDigits: 0 })}
                  </Typography>
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
                  <Typography style={{ color: 'white' }}>
                    ${oneRvrsTvl.div(1e18).toNumber().toLocaleString('en-us', { maximumFractionDigits: 0 })}
                  </Typography>
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
                  <Typography style={{ color: 'white' }}>
                    ${usdcRvrsTvl.div(1e18).toNumber().toLocaleString('en-us', { maximumFractionDigits: 0 })}
                  </Typography>
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
                    <Typography style={{ color: 'white' }}>RVRS/ETH</Typography>
                    <TypographySmall>Secondary</TypographySmall>
                  </Flex>
                </Flex>
                <Flex flexDirection="column">
                  <Typography style={{ color: '#CA57A5' }}>Sushi</Typography>
                  <TypographySmall>Platform</TypographySmall>
                </Flex>
                <Flex flexDirection="column">
                  <Typography style={{ color: 'white' }}>
                    ${ethRvrsTvl.div(1e18).toNumber().toLocaleString('en-us', { maximumFractionDigits: 0 })}
                  </Typography>
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
    opacity: 0.6;
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

export default Liquidity
