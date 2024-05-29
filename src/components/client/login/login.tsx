import { useContext, useEffect, useState } from "react";
import { infoUserContext } from "../../../hook/admin/contexts";
import { LoaderContex } from "../../../hook/admin/contexts/loader";
import { setToken, validePassword, validePhone } from "../../../util";
import requestApi from "../../../helper/api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import LoginGoogle from "./loginGoogle";

const Login = () => {
  const navigate = useNavigate();
  const { setInfoUser, infoUser } = useContext(infoUserContext);
  const { setLoader } = useContext(LoaderContex);

  useEffect(() => {
      document.title = "Login"
      if (infoUser.username) {
        navigate('/')
      }
  },[infoUser.username, navigate])
  const formLogin = {
      phone:'',
      password:''
  }
  const [loginData, setLoginForm] = useState(formLogin)
  const [formError, setFormError] = useState(formLogin)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoad, setIsLoad] = useState(true)
  
  const handleLoginForm = (event : React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;
      if (target.name) {
          setLoginForm({...loginData, [target.name]: target.value});
      }
  }
  useEffect(() => {
      if (isSubmitted) {
          validateForm();
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginData])
  const validateForm = () => {
      let isValid = true;
      const error = {...formError}
      error.phone = validePhone(loginData.phone);
      error.password = validePassword(loginData.password);
      if (error.phone || error.password) {
          isValid = false;
          setFormError({...error})
      }else {
          setFormError({...formLogin})
      }
      return isValid;
  }
  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitted(true);
      
      if (validateForm() && isLoad) {
          setIsLoad(false);
          setLoader(true);
          await requestApi('auth/login', 'POST', loginData)
          .then(res => {
              if (res.data.response) {
                  setLoader(false);
                  toast.error(res.data.response);
              }
              if (res.data.access_token) {
                  setToken('access_token', res.data.access_token);
                  setToken('refresh_token', res.data.refresh_token);
                  setLoader(true);
                  requestApi('auth/profile', 'GET', {}).then(res => {
                          setInfoUser(res.data);
                          toast.success("Đăng nhập thành công!");
                          navigate(-1)
                          setLoader(false);
                          return;
                  })
              }
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
                <h3 className=" text-xl font-semibold pb-4">Đăng nhập</h3>
                  <form className="space-y-6" onSubmit={(e) => {submitForm(e)}}>
                      <div>
                          <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                              Số điện thoại
                          </label>
                          <div className="mt-2">
                              <input
                                  onChange={handleLoginForm}
                                  onKeyUp={handleLoginForm}
                                  onFocus={handleLoginForm}
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
                              <div className="text-sm">
                                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                      Forgot password?
                                  </a>
                              </div>
                          </div>
                          <div className="mt-2">
                              <input
                                  onChange={handleLoginForm}
                                  onKeyUp={handleLoginForm}
                                  onFocus={handleLoginForm}
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
                          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"  width="20" height="20" viewBox="0 0 48 48">
                          <linearGradient id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#2aa4f4"></stop><stop offset="1" stopColor="#007ad9"></stop></linearGradient><path fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"></path><path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"></path>
                          </svg>
                          Facebook
                      </button>
                        <LoginGoogle />
                  </div>
                  <div className=" pt-4">
                    <div className=" flex gap-2 justify-center">
                      <p>Chưa có tài khoản?
                      <Link to={'/register'} className=" font-semibold text-blue-500"> Đăng kí tài khoản mới</Link> 
                      </p> 
                    </div>
                  </div>
              </div>
          </div>
      </>
  )
}

export default Login