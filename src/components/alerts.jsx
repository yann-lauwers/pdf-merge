import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="fill-current text-green-400"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z" />
  </svg>
)

export function successToast() {
  toast(<SuccessAlert />, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}

export function Toast() {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={4000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      closeButton={false}
    />
  )
}

export function SuccessAlert() {
  return (
    <div className="rounded-md bg-green-50 p-4 h-full flex items-center">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckIcon />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-green-800">
            It&apos;s merged! Thanks for using Yann Lauwers&apos;s solution (🇧🇪 )
          </p>
        </div>
      </div>
    </div>
  )
}
