import { PoolConfig, QuoteToken } from './types'
import { getVeRvrsAddress } from '../../utils/addressHelpers'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    tokenName: 'RVRS',
    quoteTokenSymbol: QuoteToken.RVRS,
    stakingTokenName: QuoteToken.RVRS,
    stakingTokenAddress: '0xED0B4b0F0E2c17646682fc98ACe09feB99aF3adE',
    quoteTokenPoolAddress: '0xED0B4b0F0E2c17646682fc98ACe09feB99aF3adE',
    tokenPoolAddress: '0xED0B4b0F0E2c17646682fc98ACe09feB99aF3adE',
    contractAddress: {
      1666700000: '',
      1666600000: '0xC9ED8bfb89F5B5ca965AA8cEAacF75576C06211E',
    },
    harvest: false,
    isFinished: false,
    tokenDecimals: 18,
  },
  {
    sousId: 1, // This is the veRVRS pool
    tokenName: 'veRVRS',
    quoteTokenSymbol: QuoteToken.RVRS,
    stakingTokenName: QuoteToken.RVRS,
    stakingTokenAddress: '0xED0B4b0F0E2c17646682fc98ACe09feB99aF3adE',
    quoteTokenPoolAddress: '0xED0B4b0F0E2c17646682fc98ACe09feB99aF3adE',
    tokenPoolAddress: '0xED0B4b0F0E2c17646682fc98ACe09feB99aF3adE',
    contractAddress: {
      1666700000: getVeRvrsAddress(),
      1666600000: getVeRvrsAddress(),
    },
    harvest: false,
    isFinished: false,
    tokenDecimals: 18,
  },
]

export default pools
