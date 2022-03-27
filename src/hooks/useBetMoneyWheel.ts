import { useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { MoneyWheelBet } from 'config/constants/types'
import { useMoneyWheel } from './useContract'

export const placeBet = async (moneyWheelContract, bet: MoneyWheelBet, account) => {
    const val1 = new BigNumber(bet.val1).multipliedBy(new BigNumber(10).pow(18))
    const val3 = new BigNumber(bet.val3).multipliedBy(new BigNumber(10).pow(18))
    const val5 = new BigNumber(bet.val5).multipliedBy(new BigNumber(10).pow(18))
    const val10 = new BigNumber(bet.val10).multipliedBy(new BigNumber(10).pow(18))
    const val20 = new BigNumber(bet.val20).multipliedBy(new BigNumber(10).pow(18))
    const val50 = new BigNumber(bet.val50).multipliedBy(new BigNumber(10).pow(18))

    return moneyWheelContract.methods
        .bet(   (val1.isNaN()) ? "0" : val1.toString(),
                (val3.isNaN()) ? "0" : val3.toString(),
                (val5.isNaN()) ? "0" : val5.toString(),
                (val10.isNaN()) ? "0" : val10.toString(),
                (val20.isNaN()) ? "0" : val20.toString(),
                (val50.isNaN()) ? "0" : val50.toString())
        .send({ from: account })
        .on('transactionHash', (tx) =>{
            return tx.transactionHash
        })
}

export const getLastResult = async (moneyWheelContract, account) => {
    return moneyWheelContract.methods
        .lastResult(account)
        .call()
}

const useBetMoneyWheel = () => {
    const { account } = useWallet()
    const moneyWheelContract = useMoneyWheel()

    const handleBet = useCallback(
        async(bet: MoneyWheelBet) => {
            const txHash = await placeBet(moneyWheelContract, bet, account)
            console.info(txHash)

            const lastResult = await getLastResult(moneyWheelContract, account)

            return lastResult
        },
        [account, moneyWheelContract]
    )

    return {onBetMoneyWheel: handleBet}
}

export default useBetMoneyWheel 