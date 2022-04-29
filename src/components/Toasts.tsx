import { toast } from 'react-toastify'

export const notifySuccess = () =>
  toast.success('Success!', {
    position: 'top-left',
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  })

export const notifyPending = () =>
  toast.info('Confirm transaction...', {
    position: 'top-left',
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'dark',
  })

export const notifyError = () =>
  toast.error('Error', {
    position: 'top-left',
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'dark',
  })
