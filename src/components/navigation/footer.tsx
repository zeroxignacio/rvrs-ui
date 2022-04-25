import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex } from '@reverse/uikit'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk'

const MenuBottom = (props) => {
  const [isChecked, setIsChecked] = useState(false)
  const { account } = useWallet()

  // eslint-disable-next-line no-new
  new RampInstantSDK({
    hostAppName: 'Your App',
    hostLogoUrl: 'https://rampnetwork.github.io/assets/misc/test-logo.png',
    swapAsset: 'ONE',
    defaultAsset: 'ONE',
  })

  return (
    <MenuContainer>
      <NavContainer>
        <Flex justifyContent="center" marginTop="0px">
          <Flex alignItems="start">
            <a
              style={{ marginLeft: '-5px' }}
              target="_blanK"
              rel="noreferrer"
              href="https://reverse.gitbook.io/docs/"
              className="nav-links"
            >
              <TypographyBold>Docs</TypographyBold>
            </a>
            ∙
            <a target="_blanK" rel="noreferrer" href="https://discord.com/invite/rvrsprotocol" className="nav-links">
              <TypographyBold>Discord</TypographyBold>
            </a>
            ∙
            <a target="_blanK" rel="noreferrer" href="https://snapshot.org/#/rvrsprotocol.eth" className="nav-links">
              <TypographyBold>Govern</TypographyBold>
            </a>
            ∙
            <a target="_blanK" rel="noreferrer" href="https://twitter.com/RVRSProtocol" className="nav-links">
              <TypographyBold>Twitter</TypographyBold>
            </a>
            ∙
            <a
              target="_blanK"
              rel="noreferrer"
              href="https://paladinsec.co/projects/reverse-protocol"
              className="nav-links"
            >
              <TypographyBold>Audit</TypographyBold>
            </a>
            ∙
            <a
              target="_blanK"
              rel="noreferrer"
              href="https://app.sushi.com/swap?outputCurrency=0xed0b4b0f0e2c17646682fc98ace09feb99af3ade"
              className="nav-links"
            >
              <TypographyBold>Buy RVRS</TypographyBold>
            </a>
            ∙
            <a
              target="_blanK"
              rel="noreferrer"
              href={`https://buy.ramp.network/?userAddress=${account}/&swapAsset=HARMONY_ONE`}
              className="nav-links"
            >
              <TypographyBold>Fiat Onramp</TypographyBold>
            </a>
          </Flex>
          {/* <object type="image/svg+xml" data="/images/reverse.svg" width="120px" style={{ marginTop: "-20px" }}>&nbsp;</object> */}
        </Flex>
        <Typography>
          2022 Reverse Protocol.
          <a
            target="_blanK"
            rel="noreferrer"
            href="https://github.com/0xIgnacio/rvrs-ui/blob/main/LICENSE"
            className="nav-links"
          >&nbsp;MIT License.
          </a>
        </Typography>
      </NavContainer>
    </MenuContainer>
  )
}

const TypographyBold = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 0px;
  text-decoration: underline;
  margin-right: 3px;
  margin-left: 3px;
  transition: 0.3s ease-in-out;

  @media screen and (max-width: 500px) {
    font-size: 12px;
    font-weight: 400;
    margin-right: 1px;
    margin-left: 1px;
  }
`

const Typography = styled.p`
  font-size: 12px;
  color: #cfcfcf;
  font-weight: 400;
  margin-top: 15px;
`

const NavContainer = styled(Container)`
  text-align: center;
  padding: 10px;
  max-width: 600px;
`
const MenuContainer = styled(Container)`
  max-width: 10000px;
  padding: 20px;
  border-width: 1px 0px 0px 0px;
  border-style: solid;
  border-color: #3a3a3a;
  margin-top: 30px;
  background-color: #0d0d0d;
  transition: all 0.3s ease-in-out;
  :hover {
    opacity: 1;
  }
`

export default MenuBottom
