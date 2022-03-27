import { useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { MoneyWheel2Bet, MoneyWheelBet } from 'config/constants/types'
import { useMoneyWheel2 } from './useContract'

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

export const getLastResult = async (moneyWheel2Contract, account) => {
    return moneyWheel2Contract.methods
        .lastResult(account)
        .call()
}

const useBetMoneyWheel2 = () => {
    const { account } = useWallet()
    const moneyWheel2Contract = useMoneyWheel2()

    const handleBet = useCallback(
        async(bet: MoneyWheel2Bet) => {
            const txHash = await placeBet(moneyWheel2Contract, bet, account)
            console.info(txHash)

            const lastResult = await getLastResult(moneyWheel2Contract, account)

            return lastResult
        },
        [account, moneyWheel2Contract]
    )

    return {onBetMoneyWheel2: handleBet}
}

export default useBetMoneyWheel2 