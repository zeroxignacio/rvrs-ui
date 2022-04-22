import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import ModalActions from 'components/modals/components/modal/modalActions'
import TokenInput from 'components/modals/components/modal/input'
import ModalButton from 'components/layout/buttons/modalButton'
import Modal from './components/modal'
import 'react-toastify/dist/ReactToastify.css'
import useI18n from '../../hooks/useI18n'
import { getFullDisplayBalance } from '../../utils/formatBalance'

interface DepositModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
}

const DepositModal: React.FC<DepositModalProps> = ({ max, onConfirm, onDismiss, tokenName = '' }) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
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
    <Modal title={`${TranslateString(999, 'Bond')} ${tokenName}`} onDismiss={onDismiss}>
      <TokenInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      />
      <ModalActions>
        <ModalButton
          style={{ justifyContent: 'center' }}
          onClick={async () => {
            notifyPending()
            setPendingTx(true)
            await onConfirm(val)
            setPendingTx(false)
            notifySuccess()
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

export default DepositModal
