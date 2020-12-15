import { toast } from 'react-toastify'

const options = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

export const notify = (msg = 'Success', status) => {
    switch (status) {
        case 400:
        case 500:
        case 'error':
            toast.error(msg, options)
            break
        case 'warning':
            toast.warn(msg, options)
            break
        default:
            toast.success(msg, options)
    }
} 