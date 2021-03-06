import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js/bignumber'
import Ripples, { createRipples } from 'react-ripples'
import Input, { InputProps } from 'components/modals/components/Input'
import { FaExternalLinkAlt, FaExternalLinkSquareAlt } from 'react-icons/fa'

interface TokenInputProps extends InputProps {
  max: number | string
  symbol: string
  onSelectMax?: () => void
  depositFeeBP?: number
  valueUsd?: number | string
}

const InputContent: React.FC<TokenInputProps> = ({
  max,
  symbol,
  onChange,
  onSelectMax,
  value,
  depositFeeBP = 0,
  valueUsd = 0,
}) => {
  const maxAvailableNo = new BigNumber(max).toNumber()
  const maxAvailableStr = maxAvailableNo.toLocaleString('en-us', { maximumFractionDigits: 3, minimumFractionDigits: 2 })

  return (
    <InputContentWrapper>
      <Text onClick={onSelectMax}>
        {maxAvailableStr}&nbsp;{symbol}&nbsp;Available
        <a target="_blanK" rel="noreferrer" href="https://app.sushi.com/swap?inputCurrency=ETH&outputCurrency=0xED0B4b0F0E2c17646682fc98ACe09feB99aF3adE&chainId=1666600000" className="nav-links">
        <Text2 style={{color:'#6699a3'}}>&nbsp;Buy&nbsp;<FaExternalLinkSquareAlt/></Text2>
      </a>
      </Text>

      <Input
        endAdornment={
          <div
            style={{
              display: 'inline-flex',
              borderRadius: 0,
              overflow: 'hidden',
              marginLeft: '10px',
            }}
          >
            <Ripples>
              <MaxButton onClick={onSelectMax}>Max</MaxButton>
            </Ripples>
          </div>
        }
        onChange={onChange}
        placeholder={maxAvailableStr}
        value={value}
      />
      
    </InputContentWrapper>
  )
}

const InputContentWrapper = styled.div``

const Text = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 2px;
  justify-content: flex-start;
  cursor: pointer;
`

const Text2 = styled.p`
  display: flex;
  font-size: 16px;
  font-color: #6699a3;
  font-weight: 500;
  margin-bottom: 5px;
  justify-content: flex-start;
  cursor: pointer;
`

const MaxButton = styled.button`
  font-size: 16px;
  font-weight: 500;
  background: #121212;
  color: #eeeeee;
  justify-content: center;
  padding: 12px;
  transition: 0.3s ease-in-out;
  border-left: 3px solid #6699a3;
  border-right: 4px solid grey;

  :hover {
    background: #121212;
  }
`

export default InputContent
