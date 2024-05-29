import { useContext, useEffect, useState } from "react";
import io, { Socket } from 'socket.io-client';
import { setToken } from "../../../util";
import { toast } from "react-toastify";
import requestApi from "../../../helper/api";
import { useNavigate } from "react-router-dom";
import { infoUserContext } from "../../../hook/admin/contexts";
import { LoaderContex } from "../../../hook/admin/contexts/loader";
import { apiUrl, socketUrl } from "../../../config";

const LoginGoogle = () => {
  const [socket, setSocket] = useState<Socket>()
  const navigate = useNavigate();
  const { setInfoUser } = useContext(infoUserContext);
  const { setLoader } = useContext(LoaderContex);
  useEffect(() => {
    const newSocket = io(socketUrl);
    newSocket.on('connect', () => {
      setSocket(newSocket);
    });
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on('login', (data) => {
        console.log(data);
        setToken('access_token', data.access_token);
        setToken('refresh_token', data.refresh_token);
        setLoader(true);
        requestApi('auth/profile', 'GET', {}).then(res => {
          setInfoUser(res.data);
          toast.success("Đăng nhập thành công!");
          navigate(-1)
          setLoader(false);
          return;
        })
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [socket]);

  const btnLoginGoogle = () => {
    setLoader(true)
    const width = 400;
    const height = 600;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    const options = `width=${width},height=${height},left=${left},top=${top}`;
    const popupLogin =  window.open(apiUrl + 'google' || 'http://localhost:3000/google', '_blank', options);
    console.log(popupLogin);
    if(popupLogin){
      waitForWindowLoad(popupLogin)
    }
  }

  const waitForWindowLoad = (checkCloseWindow: Window) => {
      if (checkCloseWindow && checkCloseWindow.closed) {
          setLoader(false)
      } else {
        setTimeout(()=>{
          waitForWindowLoad(checkCloseWindow)
        }, 100); // Kiểm tra lại sau mỗi 100ms
      }
  };

  return (
    <button onClick={()=>btnLoginGoogle()} className="flex w-full items-center gap-2 justify-center rounded-md border px-3 py-1.5 text-sm font-semibold leading-6 text-gray-700 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
      </svg>
      Google
    </button>
  )
}

export default LoginGoogle