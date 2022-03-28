import BigNumber from 'bignumber.js/bignumber'
import rvrs from 'config/constants/rvrs' 

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const RVRS_PER_BLOCK = new BigNumber(5000)
export const BLOCKS_PER_YEAR = new BigNumber(15768000)
export const HARMONY_BLOCK_TIME = 2
export const RVRS_POOL_PID = rvrs.pids.pidrvrs