import React from 'react'

const PriceChange = ({
  price,
  marketcap,
  volume,
  priceChange,

}) => {
  return (
    <div>
      {priceChange < 0 ? (
        <p color='red'>{priceChange.toFixed(2)}%</p>
      ) : (
        <p color='red'>{priceChange.toFixed(2)}%</p>
      )}
    </div>
  )
}

export default PriceChange
