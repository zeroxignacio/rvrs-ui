import poolsConfig from 'config/constants/stake'
import autorvrsAbi from 'config/abi/autorvrs.json'
import erc20ABI from 'config/abi/erc20.json'
import veRrvsAbi from 'config/abi/veRvrs.json'
import { QuoteToken } from 'config/constants/types'
import multicall from 'utils/multicall'
import { getAutoRvrsAddress, getRvrsAddress, getVeRvrsAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID
const nonBnbPools = poolsConfig.filter((p) => p.stakingTokenName !== QuoteToken.BNB)
export const fetchPoolsAllowance = async (account) => {
  const calls = nonBnbPools.map((p) => ({
    address: p.stakingTokenAddress,
    name: 'allowance',
    params: [account, p.contractAddress[CHAIN_ID]],
  }))

  const allowances = await multicall(erc20ABI, calls)
  return nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserStakeBalances = async account => {
  const calls = [
    {
      address: getAutoRvrsAddress(),
      name: 'wantLockedTotal',
      params: [account]
    }
  ];
  const stakedTokenBalancesRaw = await multicall(autorvrsAbi, calls);

  return stakedTokenBalancesRaw;
};

export const fetchUserBalances = async account => {
  const calls = [
    {
      address: getRvrsAddress(),
      name: 'balanceOf',
      params: [account]
    }
  ];
  const tokenBalancesRaw = await multicall(erc20ABI, calls);

  return tokenBalancesRaw;
};

export const fetchUserVeRvrsBalances = async account => {
  const veRvrsAddress = getVeRvrsAddress()
  const calls = [
    {
      address: veRvrsAddress,
      name: 'userInfo',
      params: [account]
    },
    {
      address: veRvrsAddress,
      name: 'balanceOf',
      params: [account]
    },
    {
      address: veRvrsAddress,
      name: 'pendingRewards',
      params: [account]
    },
    {
      address: veRvrsAddress,
      name: 'claimable',
      params: [account]
    }
  ];
  const resp = await multicall(veRrvsAbi, calls);
  // resp is a list of user info with:
  // [userInfo, veRVRS balance, pending RVRS rewards, pending veRVRS rewards]
  return resp;
};
