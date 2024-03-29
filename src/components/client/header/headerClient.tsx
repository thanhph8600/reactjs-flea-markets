import {
  FaRegEdit,
} from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  IoChatbubblesOutline,
  IoListCircleOutline,
  IoSearch,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import CategoryComponentHeader from "./category";
import AccountComponentHeader from "./account";

const HeaderClient = () => {

  return (
    <>
      <div className=" bg-[#FFBA00] py-4">
        <div className="flex justify-between px-6 items-center">
          <div className=" flex  items-center">
            <Link to={"/"} className="w-40">
              <img
                className="w-full "
                src="https://static.chotot.com/storage/APP_WRAPPER/logo/chotot-logo-appwrapper.png"
                alt=""
              />
            </Link>
            <div>
              <CategoryComponentHeader />
            </div>
          </div>
          <div className=" flex-1 ">
            <div className=" mx-10">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none "
                  placeholder="Tìm kiếm sản phẩm"
                  required
                />
                <button className="text-white absolute end-2.5 bottom-1 bg-[#FF8800]  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 ">
                  <IoSearch />
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex gap-5 items-center text-2xl">
              <p className="hover:text-gray-600 cursor-pointer">
                <IoMdNotificationsOutline />
              </p>
              <p className="hover:text-gray-600 cursor-pointer">
                <IoChatbubblesOutline />
              </p>
              <p className="hover:text-gray-600 cursor-pointer">
                <HiOutlineShoppingBag />
              </p>
              <p className="hover:text-gray-600 cursor-pointer flex gap-1 items-center">
                <IoListCircleOutline />
                <span className="text-base">Quản lý tin</span>
              </p>
              
              <div>
                <AccountComponentHeader />
              </div>
            </div>
            <div>
              <Link to={'/dang-tin'} className="text-white uppercase bg-[#FF8800]   font-medium rounded-lg text-sm px-4 py-2 flex gap-2 items-center ">
                <FaRegEdit /> Đăng tin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderClient;
