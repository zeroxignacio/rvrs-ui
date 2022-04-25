import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import cakeABI from 'config/abi/cake.json'
import { getContract } from 'utils/web3'
import { getTokenBalance } from 'utils/erc20'
import { getCakeAddress, getRvrsOneAddress, getRvrsUstAddress, getUstAddress } from 'utils/addressHelpers'
import useRefresh from './useRefresh'

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTokenBalance(ethereum, tokenAddress, account)
      setBalance(new BigNumber(res))
    }

    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, tokenAddress, fastRefresh])

  return balance
}

export const useTotalSupply = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchTotalSupply() {
      const rvrsContract = getContract(cakeABI, getCakeAddress())
      const supply = await rvrsContract.methods.totalSupply().call()
      setTotalSupply(new BigNumber(supply))
    }

    fetchTotalSupply()
  }, [slowRefresh])

  return totalSupply
}

export const useBurnedBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const rvrsContract = getContract(cakeABI, getCakeAddress())
      const bal = await rvrsContract.methods.balanceOf('0x000000000000000000000000000000000000dEaD').call()
      setBalance(new BigNumber(bal))
    }

    fetchBalance()
  }, [tokenAddress, slowRefresh])

  return balance
}

export const useNonCirculatingBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const rvrsContract = getContract(cakeABI, getCakeAddress())
      const bal = await rvrsContract.methods.balanceOf('0xA3904e99b6012EB883DB1090D02D4e954539EC61').call()
      setBalance(new BigNumber(bal))
    }

    fetchBalance()
  }, [tokenAddress, slowRefresh])

  return balance
}



export const useLpBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const rvrsContract = getContract(cakeABI, getCakeAddress())
      const bal = await rvrsContract.methods.balanceOf('0xcde0a00302cf22b3ac367201fbd114cefa1729b4').call()
      setBalance(new BigNumber(bal))
    }

    fetchBalance()
  }, [tokenAddress, slowRefresh])

  return balance
}

export const useLpBalance2 = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const rvrsContract = getContract(cakeABI, getCakeAddress())
      const bal = await rvrsContract.methods.balanceOf('0xf8838fcc026d8e1f40207acf5ec1da0341c37fe2').call()
      setBalance(new BigNumber(bal))
    }

    fetchBalance()
  }, [tokenAddress, slowRefresh])

  return balance
}

export const useLpBalance3 = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const rvrsContract = getContract(cakeABI, getCakeAddress())
      const bal = await rvrsContract.methods.balanceOf('0xd1af43eb1d14b0377fbe35d2bfadab16b96c0911').call()
      setBalance(new BigNumber(bal))
    }

    fetchBalance()
  }, [tokenAddress, slowRefresh])

  return balance
}

export const useStakedBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const rvrsContract = getContract(cakeABI, getCakeAddress())
      const bal = await rvrsContract.methods.balanceOf('0xeea71889c062c135014ec34825a1958c87a2ac61').call()
      setBalance(new BigNumber(bal))
    }

    fetchBalance()
  }, [tokenAddress, slowRefresh])

  return balance
}


export const useUstTreasuryBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const ustContract = getContract(cakeABI, getUstAddress())
      const bal = await ustContract.methods.balanceOf('0xA3904e99b6012EB883DB1090D02D4e954539EC61').call()
      setBalance(new BigNumber(bal))
    }

    fetchBalance()
  }, [tokenAddress, slowRefresh])

  return balance
}

export const useRvrsOneTreasuryBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const rvrsoneContract = getContract(cakeABI, getRvrsOneAddress())
      const bal = await rvrsoneContract.methods.balanceOf('0xA3904e99b6012EB883DB1090D02D4e954539EC61').call()
      setBalance(new BigNumber(bal))
    }

    fetchBalance()
  }, [tokenAddress, slowRefresh])

  return balance
}


export default useTokenBalance
