/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import autoRvrsAbi from 'config/abi/autorvrs.json'
import poolsConfig from 'config/constants/stake'
import { fetchPoolsAllowance, fetchUserBalances, fetchUserStakeBalances, fetchUserVeRvrsBalances } from './fetchPoolsUser'
import { PoolsState, Pool } from '../types'
import { fetchPoolsTotalStaking, fetchPoolsVeRvrsData } from './fetchPools'
import { getAutoRvrsAddress } from '../../utils/addressHelpers'
import multicall from '../../utils/multicall'

const initialState: PoolsState = { data: [...poolsConfig] }

export const PoolsSlice = createSlice({
  name: 'Pools',
  initialState,
  reducers: {
    setPoolsPublicData: (state, action) => {
      const livePoolsData: Pool[] = action.payload
      state.data = state.data.map((pool) => {
        const livePoolData = livePoolsData.find((entry) => entry.sousId === pool.sousId)
        return { ...pool, ...livePoolData }
      })
    },
    setPoolsVeRvrsUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((pool) => {
        const userPoolData = userData.find((entry) => entry.sousId === pool.sousId)
        return { ...pool, veRvrsUserData: userPoolData }
      })
    },
    updatePoolsVeRvrsUserData: (state, action) => {
      const { field, value, sousId } = action.payload
      const index = state.data.findIndex((p) => p.sousId === sousId)
      state.data[index] = { ...state.data[index], veRvrsUserData: { ...state.data[index].veRvrsUserData, [field]: value } }
    },
    setPoolsUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((pool) => {
        const userPoolData = userData.find((entry) => entry.sousId === pool.sousId)
        return { ...pool, userData: userPoolData }
      })
    },
    updatePoolsUserData: (state, action) => {
      const { field, value, sousId } = action.payload
      const index = state.data.findIndex((p) => p.sousId === sousId)
      state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
    },
  },
})

// Actions
export const {
  setPoolsPublicData,
  setPoolsUserData,
  setPoolsVeRvrsUserData,
  updatePoolsUserData,
  updatePoolsVeRvrsUserData
} = PoolsSlice.actions

// Thunks
export const fetchPoolsPublicDataAsync = () => async (dispatch) => {
  const { userInfo, pricePerFullShare } = await fetchPoolsTotalStaking()
  const veRvrsData =  await fetchPoolsVeRvrsData()
  const veRvrsPublicDatas = {
    totalStaked: veRvrsData[0],
    totalSupply: veRvrsData[1],
    generationRate: veRvrsData[2],
    maxCap: veRvrsData[3],
    withdrawFee: veRvrsData[4],
    withdrawFeeTime: veRvrsData[5]
  }
  const liveData = poolsConfig.map((pool) => {
    return {
      ...pool,
      totalStaked: userInfo[0].amount,
      pricePerShare: pricePerFullShare[0].toString(),
      veRvrsPublicData: veRvrsPublicDatas
    }
  })
  console.log('fetchPoolsPublicDataAsync', veRvrsPublicDatas)

  dispatch(setPoolsPublicData(liveData))
}

export const fetchPoolsUserInfo = async (account) => {
  const calls = [
    {
      address: getAutoRvrsAddress(),
      name: 'userInfo',
      params: [account]
    }
  ];
  const userInfo = await multicall(autoRvrsAbi, calls);

  return userInfo;
};

export const fetchPoolsUserDataAsync = (account) => async (dispatch) => {
  const allowances = await fetchPoolsAllowance(account)
  const stakingTokenBalances = await fetchUserBalances(account)
  const stakedBalances = await fetchUserStakeBalances(account)
  const userInfo = await fetchPoolsUserInfo(account)
  const veRvrsUserInfo = await fetchUserVeRvrsBalances(account)

  const userData = poolsConfig.map((pool) => ({
    sousId: pool.sousId,
    allowance: allowances[pool.sousId],
    stakingTokenBalance: stakingTokenBalances[0],
    stakedBalance: stakedBalances[0],
    lastDepositedTime: userInfo[0].lastDepositedTime,
    lastUserActionTime: userInfo[0].lastUserActionTime,
    reverseAtlastUserAction: userInfo[0].reverseAtlastUserAction,
  }))

  const veRvrsUserData = poolsConfig.map((pool) => ({
    sousId: pool.sousId,
    allowance: allowances[1],
    rvrsStaked: veRvrsUserInfo[0].amount,
    veRvrsBalance: veRvrsUserInfo[1],
    pendingRvrs: veRvrsUserInfo[2],
    pendingVeRvrs: veRvrsUserInfo[3],
    lastClaim: veRvrsUserInfo[0].lastClaim,
    lastDeposit: veRvrsUserInfo[0].lastDeposit,
  }))
  console.log('veRvrsUserData', veRvrsUserData)

  dispatch(setPoolsVeRvrsUserData(veRvrsUserData))
  dispatch(setPoolsUserData(userData))
}


export const updateUserAllowance = (sousId: string, account: string) => async (dispatch) => {
  const allowances = await fetchPoolsAllowance(account)
  dispatch(updatePoolsUserData({ sousId, field: 'allowance', value: allowances[sousId] }))
}

export const updateUserBalance = (sousId: string, account: string) => async (dispatch) => {
  const tokenBalances = await fetchUserBalances(account)
  dispatch(updatePoolsUserData({ sousId, field: 'stakingTokenBalance', value: tokenBalances[0] }))
}

export const updateUserStakedBalance = (sousId: string, account: string) => async (dispatch) => {
  const stakedBalances = await fetchUserStakeBalances(account)
  dispatch(updatePoolsUserData({ sousId, field: 'stakedBalance', value: stakedBalances[0] }))
}

/* export const updateUserPendingReward = (sousId: string, account: string) => async (dispatch) => {
  const pendingRewards = await fetchUserPendingRewards(account)
  dispatch(updatePoolsUserData({ sousId, field: 'pendingReward', value: pendingRewards[sousId] }))
} */

export default PoolsSlice.reducer