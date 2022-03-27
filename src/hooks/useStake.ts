import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync, updateUserStakedBalance, updateUserBalance } from 'state/actions'
import { stake, sousStake, sousStakeBurn, sousStakeBurn2 } from 'utils/callHelpers'
import { useAutoRvrs, useMasterchef, useSousChefBurn } from './useContract'

const useStake = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(masterChefContract, pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid],
  )

  return { onStake: handleStake }
}

export const useSousStake = (sousId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const sousChefContract = useAutoRvrs()

  const handleSousStake = useCallback(
    async (amount: string) => {
      if (sousId === 0) {
        await sousStake(sousChefContract, amount, account)
      } else {
        await sousStake(sousChefContract, amount, account)
      }
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
    },
    [account, dispatch, sousChefContract, sousId],
  )

  return { onStake: handleSousStake }
}

export const useSousStakeBurn = (sousId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const sousChefContract = useSousChefBurn(sousId)

  const handleSousStake = useCallback(
    async (amount: string) => {
      if (sousId <= 3) {
        await sousStakeBurn(sousChefContract, amount, account)
      } else {
        await sousStakeBurn2(sousChefContract, amount, account)
      }
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
    },
    [account, dispatch, sousChefContract, sousId],
  )

  return { onStake: handleSousStake }
}





export default useStake
