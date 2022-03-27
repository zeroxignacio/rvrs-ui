import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Contract } from 'web3-eth-contract'
import { ethers } from 'ethers'
import { useDispatch } from 'react-redux'
import {updateUserAllowance, fetchFarmUserDataAsync, updateUserAllowance2} from 'state/actions'
import { approve } from 'utils/callHelpers'
import { useMasterchef, useCake, useLottery, useMoneyWheel, useMoneyWheel2, useWone, useSousChefBurn, useAutoRvrs } from './useContract'

// Approve a Farm
export const useApprove = (lpContract: Contract) => {
  const dispatch = useDispatch()
  const { account }: { account: string } = useWallet()
  const masterChefContract = useMasterchef()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account)
      dispatch(fetchFarmUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, masterChefContract])

  return { onApprove: handleApprove }
}

// Approve a Pool
export const useSousApprove = (lpContract: Contract, sousId) => {
  const dispatch = useDispatch()
  const { account }: { account: string } = useWallet()
  const sousChefContract = useAutoRvrs()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, sousChefContract, account)
      dispatch(updateUserAllowance(sousId, account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, sousChefContract, sousId])

  return { onApprove: handleApprove }
}

export const useSousApproveBurn = (lpContract: Contract, sousId) => {
  const dispatch = useDispatch()
  const { account }: { account: string } = useWallet()
  const sousChefContract = useSousChefBurn(sousId)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, sousChefContract, account)
      dispatch(updateUserAllowance2(sousId, account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, sousChefContract, sousId])

  return { onApprove: handleApprove }
}
// Approve the lottery
export const useLotteryApprove = () => {
  const { account }: { account: string } = useWallet()
  const cakeContract = useCake()
  const lotteryContract = useLottery()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(cakeContract, lotteryContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, cakeContract, lotteryContract])

  return { onApprove: handleApprove }
}

/// Je moet in het token contract het wheel contract toestemming geven om namens jou tokens uit te mogen geven.
export const useMoneyWheelApprove = () => {
  const { account }: { account: string } = useWallet()
  const cakeContract = useCake()
  const moneyWheelContract = useMoneyWheel()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(cakeContract, moneyWheelContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, cakeContract, moneyWheelContract])

  return { onApprove: handleApprove }
}

/// Approve the Money Wheel2
export const useMoneyWheel2Approve = () => {
  const { account }: { account: string } = useWallet()
  const jewelContract = useWone()
  const moneyWheel2Contract = useMoneyWheel2()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(jewelContract, moneyWheel2Contract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, jewelContract, moneyWheel2Contract])

  return { onApprove: handleApprove }
}

// Approve an IFO
export const useIfoApprove = (tokenContract: Contract, spenderAddress: string) => {
  const { account } = useWallet()
  const onApprove = useCallback(async () => {
    try {
      const tx = await tokenContract.methods
        .approve(spenderAddress, ethers.constants.MaxUint256)
        .send({ from: account })
      return tx
    } catch {
      return false
    }
  }, [account, spenderAddress, tokenContract])

  return onApprove
}
