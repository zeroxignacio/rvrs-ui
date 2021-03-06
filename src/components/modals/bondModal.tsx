import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import ModalActions from 'components/modals/components/modal/modalActions'
import TokenInput from 'components/modals/components/modal/input'
import ModalButton from 'components/layout/buttons/modalButton'
import { notifyError, notifyPending, notifySuccess } from 'components/Toasts'
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

export default DepositModal
