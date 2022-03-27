import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Contract } from 'web3-eth-contract'
import { useCake, useLottery, useMoneyWheel, useMoneyWheel2, useWone } from './useContract'
import { getAllowance } from '../utils/erc20'

// Retrieve lottery allowance
export const useLotteryAllowance = () => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const lotteryContract = useLottery()
  const cakeContract = useCake()

  useEffect(() => {
    const fetchAllowance = async () => {
      const res = await getAllowance(cakeContract, lotteryContract, account)
      setAllowance(new BigNumber(res))
    }

    if (account && cakeContract && cakeContract) {
      fetchAllowance()
    }
    const refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, cakeContract, lotteryContract])

  return allowance
}

// Retrieve MoneyWheel allowance
export const useMoneyWheelAllowance = () => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const moneyWheelContract = useMoneyWheel()
  const cakeContract = useCake()

  useEffect(() => {
    const fetchAllowance = async () => {
      const res = await getAllowance(cakeContract, moneyWheelContract, account)
      setAllowance(new BigNumber(res))
    }

    if (account && cakeContract && cakeContract) {
      fetchAllowance()
    }
    const refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, cakeContract, moneyWheelContract])

  return allowance
}

// Retrieve MoneyWheel2 allowance
export const useMoneyWheel2Allowance = () => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const moneyWheelContract2 = useMoneyWheel2()
  const oneContract = useWone()

  useEffect(() => {
    const fetchAllowance = async () => {
      const res = await getAllowance(oneContract, moneyWheelContract2, account)
      setAllowance(new BigNumber(res))
    }

    if (account && oneContract && oneContract) {
      fetchAllowance()
    }
    const refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, oneContract, moneyWheelContract2])

  return allowance
}

// Retrieve IFO allowance
export const useIfoAllowance = (tokenContract: Contract, spenderAddress: string, dependency?: any) => {
  const { account }: { account: string } = useWallet()
  const [allowance, setAllowance] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await tokenContract.methods.allowance(account, spenderAddress).call()
        setAllowance(new BigNumber(res))
      } catch (e) {
        setAllowance(null)
      }
    }
    fetch()
  }, [account, spenderAddress, tokenContract, dependency])

  return allowance
}
