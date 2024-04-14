import {
  FaRegEdit,
} from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import {
  IoListCircleOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import CategoryComponentHeader from "./category";
import AccountComponentHeader from "./account";
import SearchHeader from "./search";
import IconChatHeader from "./iconChatHeader";
import Notification from "./notification";

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
            <SearchHeader />
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex gap-5 items-center text-2xl">
              
              <Notification />

              <IconChatHeader />
              
              <div className=" cursor-pointer group relative">
                <p className=""><HiOutlineShoppingBag /></p>
                <div className=" hidden group-hover:block absolute pt-4 z-20">
                  <div className=" bg-white w-32 text-sm  rounded shadow-lg overflow-hidden">
                    <Link to={'my-orders/buyer'} className=" block py-2 border-b  text-center hover:bg-gray-100">Đơn mua</Link>
                    <Link to={'my-orders/seller'} className=" block py-2  text-center hover:bg-gray-100">Đơn bán</Link>
                  </div>
                </div>
              </div>

              <Link to={`my-ads`} className=" cursor-pointer flex gap-1 items-center">
                <IoListCircleOutline />
                <span className="text-base">Quản lý tin</span>
              </Link>
              
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
