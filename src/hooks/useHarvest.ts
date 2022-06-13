import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync, updateUserBalance, updateUserPendingReward2 } from 'state/actions'
import {
  soushHarvest,
  soushHarvestBnb,
  harvest,
  soushHarvestBurn,
  soushHarvestBurn2,
  veRvrsClaim,
} from 'utils/callHelpers'
import { useAutoRvrs, useMasterchef, useSousChef2, useSousChefBurn, useVeRvrs } from './useContract'

export const useHarvest = (farmPid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    const txHash = await harvest(masterChefContract, farmPid, account)
    dispatch(fetchFarmUserDataAsync(account))
    return txHash
  }, [account, dispatch, farmPid, masterChefContract])

  return { onReward: handleHarvest }
}

export const useAllHarvest = (farmPids: number[]) => {
  const { account } = useWallet()
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    const harvestPromises = farmPids.reduce((accum, pid) => {
      return [...accum, harvest(masterChefContract, pid, account)]
    }, [])

    return Promise.all(harvestPromises)
  }, [account, farmPids, masterChefContract])

  return { onReward: handleHarvest }
}

export const useSousHarvest = (sousId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const sousChefContract = useAutoRvrs()
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    if (sousId === 0) {
      await harvest(masterChefContract, 0, account)
    } else if (isUsingBnb) {
      await soushHarvestBnb(sousChefContract, account)
    } else {
      await soushHarvest(sousChefContract, account)
    }
    dispatch(updateUserBalance(sousId, account))
  }, [account, dispatch, isUsingBnb, masterChefContract, sousChefContract, sousId])

  return { onReward: handleHarvest }
}

export const useVeRvrsClaim = (sousId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const sousChefContract = useVeRvrs()
  const handleHarvest = useCallback(async () => {
    await veRvrsClaim(sousChefContract, account, false)

    dispatch(updateUserBalance(sousId, account))
  }, [account, dispatch, sousChefContract, sousId])

  return { onReward: handleHarvest }
}

export const useSousHarvestBurn = (sousId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const sousChefContract = useSousChefBurn(sousId)

  const handleHarvest = useCallback(async () => {
    if (sousId <= 3) {
      await soushHarvestBurn(sousChefContract, account)
    } else {
      await soushHarvestBurn2(sousChefContract, account)
    }
    dispatch(updateUserPendingReward2(sousId, account))
    dispatch(updateUserBalance(sousId, account))
  }, [account, dispatch, sousChefContract, sousId])

  return { onReward: handleHarvest }
}
