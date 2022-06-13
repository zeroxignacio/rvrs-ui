import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import ModalActions from 'components/modals/components/modal/modalActions'
import 'react-toastify/dist/ReactToastify.css'
import Modal from 'components/modals/components/modal/Modal'
import ModalButton from 'components/layout/buttons/modalButton'
import TokenInput from 'components/modals/components/modal/input'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { notifyError, notifyPending, notifySuccess } from 'components/Toasts'

interface WithdrawModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  pricePerShare?: BigNumber
  tokenName?: string
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ onConfirm, onDismiss, max }) => {
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

  return (
    <Modal title="Unstake RVRS" onDismiss={onDismiss}>
      <TokenInput onSelectMax={handleSelectMax} onChange={handleChange} value={val} max={fullBalance} symbol="RVRS" />
      <ModalActions>
        <ModalButton
          onClick={async () => {
            notifyPending()
            try {
              setPendingTx(true)
              await onConfirm(val)
              setPendingTx(false)
              notifySuccess()
              onDismiss()
            } catch (e) {
              notifyError()
            }
          }}
        >
          Confirm
        </ModalButton>
      </ModalActions>
    </Modal>
  )
}

export default WithdrawModal
