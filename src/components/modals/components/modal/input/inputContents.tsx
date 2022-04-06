import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js/bignumber'
import Ripples, { createRipples } from 'react-ripples'
import Input, { InputProps } from 'components/modals/components/Input'

interface TokenInputProps extends InputProps {
  max: number | string
  symbol: string
  onSelectMax?: () => void
  depositFeeBP?: number
  valueUsd?: number | string
}

const InputContent: React.FC<TokenInputProps> = (
  { max, symbol, onChange, onSelectMax, value, depositFeeBP = 0, valueUsd = 0 }) => {
  const maxAvailableNo = new BigNumber(max).toNumber();
  const maxAvailableStr = maxAvailableNo.toLocaleString('en-us', { maximumFractionDigits: 3, minimumFractionDigits: 2 });

  return (
    <InputContentWrapper>
      <Text onClick={onSelectMax}>{maxAvailableStr}&nbsp;{symbol}&nbsp;Available</Text>
      <Input
        endAdornment={<div
          style={{
            display: 'inline-flex',
            borderRadius: 0,
            overflow: 'hidden',
            marginLeft: '10px',
          }}
        >
          <Ripples>
            <MaxButton onClick={onSelectMax}>
              Max
            </MaxButton>
          </Ripples>
        </div>}
        onChange={onChange}
        placeholder={maxAvailableStr}
        value={value}      />
    </InputContentWrapper>
  )
}

const InputContentWrapper = styled.div``

const Text = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
  justify-content: flex-start;
  cursor: pointer;
`

const MaxButton = styled.button`
  font-size: 16px;
  font-weight: 500;
  background: #121212;
  color: #EEEEEE;
  justify-content: center;
  padding: 11px;
  transition: 0.3s ease-in-out;
  border-left: 3px solid #6699A3;
  :hover {
    background: #121212;
  } 
`

export default InputContent
