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
import { useContext } from "react";
import { infoUserContext } from "../../../hook/admin/contexts";

const HeaderClient = () => {
  const { infoUser } = useContext(infoUserContext)

  return (
    <>
      <div className=" bg-[#1a9c13] py-4 ">
        <div className="flex flex-col md:flex-row justify-between px-6 items-center">
          <div className=" flex justify-between items-center">
            <Link to={"/"} className=" w-40">
              <img
                className="w-full px-2"
                src="../../public/image/logo.png"
                alt=""
              />
            </Link>
            <div className=" block md:hidden text-white text-2xl ml-6">
              <AccountComponentHeader />
            </div>
            <div className="hidden md:block pl-4">
              <CategoryComponentHeader />
            </div>
          </div>
          <div className=" flex-1 w-full ">
            <SearchHeader />
          </div>

          <div className="flex gap-4 mt-4 md:mt-0 items-center text-white">
            <div className=" gap-5 items-center flex text-2xl">

              {infoUser.sub && <Notification />}

              <IconChatHeader />

              <div className=" cursor-pointer group relative hidden lg:block">
                <p className=""><HiOutlineShoppingBag /></p>
                <div className=" hidden group-hover:block absolute pt-4 z-20">
                  <div className="text-black bg-white w-32 text-sm  rounded shadow-lg overflow-hidden">
                    <Link to={'my-orders/buyer'} className=" block py-2 border-b  text-center hover:bg-gray-100">Đơn mua</Link>
                    <Link to={'my-orders/seller'} className=" block py-2  text-center hover:bg-gray-100">Đơn bán</Link>
                  </div>
                </div>
              </div>

              <Link to={`my-ads`} className=" hidden lg:flex cursor-pointer  gap-1 items-center">
                <IoListCircleOutline />
                <span className="text-base hidden xl:block">Quản lý tin</span>
              </Link>


            </div>
            <div className=" hidden md:block text-2xl">
              <AccountComponentHeader />
            </div>
            <div>
              <Link to={'/dang-tin'} className="text-white uppercase bg-[#1dce14]   font-medium rounded-lg text-sm px-4 py-2 flex gap-2 items-center ">
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
