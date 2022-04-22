import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import ModalActions from 'components/modals/components/modal/modalActions'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from 'components/modals/components/modal/Modal'
import useWalletModal from 'components/modals/WalletModal'
import ModalButton from 'components/layout/buttons/modalButton'
import TokenInput from 'components/modals/components/modal/input'
import { getFullDisplayBalance } from 'utils/formatBalance'

const DEFAULT_TOKEN_DECIMALS = new BigNumber(10).pow(18)

interface WithdrawModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  pricePerShare?: BigNumber
  tokenName?: string
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
  onConfirm,
  onDismiss,
  max,
  tokenName = '',
  pricePerShare = DEFAULT_TOKEN_DECIMALS,
}) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])
  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )
  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])
  const getSharesFromAmount = (amount) => {
    const shares = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMALS).div(pricePerShare)
    console.log('getSharesFromAmount', pricePerShare, amount, shares.toString())
    return shares.toFixed(18).toString()
  }

  const notifySuccess = () =>
    toast.success('Success!', {
      position: 'top-left',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })

  const notifyPending = () =>
    toast.info('Confirm transaction...', {
      position: 'top-left',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })

  return (
    <Modal title={`Unstake ${tokenName}`} onDismiss={onDismiss}>
      <TokenInput
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        value={val}
        max={fullBalance}
        symbol={tokenName}
      />
      <ModalActions>
        <ModalButton
          onClick={async () => {
            notifyPending()
            setPendingTx(true)
            await onConfirm(getSharesFromAmount(val))
            notifySuccess()
            setPendingTx(false)
            onDismiss()
          }}
        >
          <ToastContainer
            position="top-left"
            autoClose={10000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          Confirm
        </ModalButton>
      </ModalActions>
    </Modal>
  )
}

export default WithdrawModal
