import { useContext, useEffect, useState } from "react";
import { infoUserContext } from "../../../hook/admin/contexts";
import { LoaderContex } from "../../../hook/admin/contexts/loader";
import { setToken, validePassword, validePhone } from "../../../util";
import requestApi from "../../../helper/api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { setInfoUser, infoUser } = useContext(infoUserContext);
  const { setLoader } = useContext(LoaderContex);
  useEffect(() => {
    document.title = "Register"
    if (infoUser.username) {
      navigate('/')
    }
  }, [infoUser, navigate])
  const formRegister = {
    name: '',
    phone: '',
    password: '',
  }
  const [registerData, setRegisterForm] = useState(formRegister)
  const [formError, setFormError] = useState(formRegister)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoad, setIsLoad] = useState(true)

  const handleRegisterForm = (event: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (target.name) {
      setRegisterForm({ ...registerData, [target.name]: target.value });
    }
  }
  useEffect(() => {
    if (isSubmitted) {
      validateForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerData])
  const validateForm = () => {
    let isValid = true;
    const error = { ...formError }
    error.phone = validePhone(registerData.phone);
    error.password = validePassword(registerData.password);
    if (registerData.name == '') {
      error.name = 'Không được để trống'
    }else {
      error.name = ''
    }
    if (error.phone || error.password || formError.name) {
      isValid = false;
      setFormError({ ...error })
    } else {
      setFormError({ ...formRegister })
    }
    return isValid;
  }
  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (validateForm() && isLoad) {
      setIsLoad(false);
      setLoader(true);
      await requestApi('customer', 'POST', registerData)
        .then(res => {
          if (res.data.response) {
            setLoader(false);
            toast.error(res.data.response);
          }
          requestApi('auth/login', 'POST', registerData).then(resLogin=>{
            if (resLogin.data.response) {
              setLoader(false);
              toast.error(resLogin.data.response);
            }
            if (resLogin.data.access_token) {
              setToken('access_token', resLogin.data.access_token);
              setToken('refresh_token', resLogin.data.refresh_token);
              setLoader(true);
              requestApi('auth/profile', 'GET', {}).then(res => {
                setInfoUser(res.data);
                toast.success("Đăng nhập thành công!");
                navigate('/')
                setLoader(false);
                return;
              })
            }
          })          
          
        }).catch(err => {
          toast.error("Có lỗi xảy ra vui lòng thử lại",);
          setLoader(false);
          console.log(err)
        })
      setTimeout(() => {
        setIsLoad(true);
      }, 2000);
    }
    if (!isLoad) {
      toast.warn("Vui lòng đợi trong giây lát",);
    }
  }
  return (
    <>
      <div className="bg-gray-100 min-h-screen flex flex-col px-6 py-6 lg:px-8">

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md p-10 border bg-white shadow-md rounded-lg">
          <h3 className=" text-xl font-semibold pb-4">Tạo tài khoản</h3>
          <form className="space-y-6" onSubmit={(e) => { submitForm(e) }}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Họ và tên
              </label>
              <div className="mt-2">
                <input
                  onChange={handleRegisterForm}
                  onKeyUp={handleRegisterForm}
                  onFocus={handleRegisterForm}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="text-red-500 text-sm pt-2">{formError.name}</p>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Số điện thoại
              </label>
              <div className="mt-2">
                <input
                  onChange={handleRegisterForm}
                  onKeyUp={handleRegisterForm}
                  onFocus={handleRegisterForm}
                  id="phone"
                  name="phone"
                  type="text"
                  autoComplete="phone"
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="text-red-500 text-sm pt-2">{formError.phone}</p>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleRegisterForm}
                  onKeyUp={handleRegisterForm}
                  onFocus={handleRegisterForm}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="text-red-500 text-sm pt-2">{formError.password}</p>
            </div>

            <div>
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="flex justify-between gap-4 pt-10 pb-4 items-center">
            <p className=" relative w-full after:absolute after:top-0 after:left-0 after:w-full after:h-0.5  after:bg-gray-200"></p>
            <p className=" shrink-0 text-sm">Hoặc tiếp tục với</p>
            <p className=" relative w-full after:absolute after:top-0 after:left-0 after:w-full after:h-0.5  after:bg-gray-200"></p>
          </div>
          <div className="flex gap-4">
            <button className="flex w-full items-center gap-2 justify-center rounded-md border px-3 py-1.5 text-sm font-semibold leading-6 text-gray-700 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                <linearGradient id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#2aa4f4"></stop><stop offset="1" stopColor="#007ad9"></stop></linearGradient><path fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"></path><path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"></path>
              </svg>
              Facebook
            </button>
            <button className="flex w-full items-center gap-2 justify-center rounded-md border px-3 py-1.5 text-sm font-semibold leading-6 text-gray-700 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
              Google
            </button>
          </div>
          <div className=" pt-4">
            <div className=" flex gap-2 justify-center">
              <p>Đã có tài khoản?</p>
              <Link to={'/login'} className=" font-semibold text-blue-500"> Đăng nhập</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register