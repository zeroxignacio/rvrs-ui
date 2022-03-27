import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import {
  fetchFarmUserDataAsync,
  updateUserStakedBalance,
  updateUserBalance,
  updateUserPendingReward2,
} from 'state/actions'
import { unstake, sousUnstake, sousEmegencyUnstake } from 'utils/callHelpers'
import { useAutoRvrs, useMasterchef,useSousChef2, useSousChefBurn } from './useContract'

const useUnstake = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid],
  )

  return { onUnstake: handleUnstake }
}

const SYRUPIDS = [0]

export const useSousUnstake = (sousId, enableEmergencyWithdraw = false) => {
  const dispatch = useDispatch();
  const { account } = useWallet();
  const sousChefContract = useAutoRvrs();

  const handleUnstake = useCallback(
    async (amount: string) => {
      if (enableEmergencyWithdraw) {
        const txHash = await sousEmegencyUnstake(sousChefContract, amount, account);
        console.info(txHash);
      } else {
        const txHash = await sousUnstake(sousChefContract, amount, account);
        console.info(txHash);
      }
      dispatch(updateUserStakedBalance(sousId, account));
      dispatch(updateUserBalance(sousId, account));
    },
    [account, dispatch, enableEmergencyWithdraw, sousChefContract, sousId]
  )

  return { onUnstake: handleUnstake };
}

export const useSousUnstakeBurn = (sousId) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useSousChef2()
  const sousChefContract = useSousChefBurn(sousId)
  const isOldSyrup = SYRUPIDS.includes(sousId)

  const handleUnstake = useCallback(
    async (amount: string) => {
      if (sousId === 0) {
        const txHash = await sousUnstake(masterChefContract, amount, account)
        console.info(txHash)
      } else if (isOldSyrup) {
        const txHash = await sousEmegencyUnstake(sousChefContract, amount, account)
        console.info(txHash)
      } else {
        const txHash = await sousUnstake(sousChefContract, amount, account)
        console.info(txHash)
      }
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
      dispatch(updateUserPendingReward2(sousId, account))
    },
    [account, dispatch, isOldSyrup, masterChefContract, sousChefContract, sousId],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
