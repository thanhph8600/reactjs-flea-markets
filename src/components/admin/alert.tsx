import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { ScaleLoader } from 'react-spinners'
import { useContext } from "react"
import { LoaderContex } from "../../hook/admin/contexts/loader"

const Alert = () => {
  const { isLoader } = useContext(LoaderContex)
  return (
    <>
      <ScaleLoader loading={isLoader} cssOverride={{
        position: 'fixed',
        top: '50%',
        left :'50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'wait'
  }} color="#36d7b7" />
      <Outlet />
      <ToastContainer />
    </>
  )
}

export default Alert