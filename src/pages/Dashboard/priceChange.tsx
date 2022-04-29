import React from 'react'
import styled, { keyframes } from 'styled-components'

const PriceChange = ({ price, marketcap, volume, priceChange }) => {
  return (
    <div>
      {priceChange < 0 ? (
        <Typography2>{priceChange.toFixed(2)}%</Typography2>
      ) : (
        <Typography3>+{priceChange.toFixed(2)}%</Typography3>
      )}
    </div>
  )
}

const Typography2 = styled.p`
  font-size: 16px;
  color: #b33f40;
  font-weight: 400;
`

const Typography3 = styled.p`
  font-size: 16px;
  color: #6ccca5;
  font-weight: 400;
`

export default PriceChange
