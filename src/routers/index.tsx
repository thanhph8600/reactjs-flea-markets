import { Route, Routes } from 'react-router-dom';
import Dashboard from "../components/admin/dashboard/dashboard.admin.component";
import ListUser from "../components/admin/users/listUsers.admin.component";
import AdminLayout from "../layouts/admin/admin.layout";
import LoginAdmin from '../components/admin/login.admin';
import { AdminPrivateRouter, AdminPubliceRouter } from './checkAdminRouter';
import Alert from '../components/admin/alert';
import ListCategory from '../components/admin/categories/listCategory';
import ListProduct from '../components/admin/product/listProduct';
import ListCategoryDetail from '../components/admin/categories/categoryDetail/listCategoryDetail';
import ListSpecification from '../components/admin/specification/listSpecification';
import EditSpecification from '../components/admin/specification/editSpecifitaion';
import { ClientPrivateRouter, ClientPubliceRouter } from './checkClientRouter';
import NotFoundPage from '../pages/not-found-page';
import Home from '../components/client/home/home';
import ClientLayout from '../layouts/clients/client.layout';
import ListProductClient from '../components/client/listProduct';
import DetailCustomer from '../components/client/customer/detailCustomer';
import Login from '../components/client/login/login';
import Register from '../components/client/login/register';
import AddProduct from '../components/client/addProduct/addProduct';
import ManagementProduct from '../components/client/managementProduct/managementProduct';
import ChatComponent from '../components/client/chat/chatComponent';
import Wallet from '../components/client/wallet/wallet';
import CheckoutWallet from '../components/client/wallet/checkoutWallet';
import OrderConfirmation from '../components/client/buy-now/orderConfirmation';
import BuyerComponent from '../components/client/my-orders/buyer';
import SellerComponent from '../components/client/my-orders/seller';
import GetIDproduct from '../components/client/detailProduct/getIDproduct';
import GetIDproductEdit from '../components/client/editProduct/getIDproductEdit';
const Router = () => {
  return (
    <Routes>
      <Route element={<Alert />} >
        <Route element={<ClientLayout />}>
          <Route element={<ClientPubliceRouter />} >
            <Route path="/" element={<Home />} />
            <Route path="/:slug" element={<ListProductClient />} />
            <Route path="/detail-product/:id" element={<GetIDproduct />} />
            <Route path="/customer/:id" element={<DetailCustomer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<ClientPrivateRouter />} >
            <Route path="/dang-tin" element={<AddProduct />} />
            <Route path="/cap-nhat-tin/:idProduct" element={<GetIDproductEdit />} />
            <Route path="/my-ads" element={<ManagementProduct />} />
            <Route path="/my-ads/:idProduct" element={<ManagementProduct />} />
            <Route path="/chat" element={<ChatComponent />} />
            <Route path="/chat/:idCustomer" element={<ChatComponent />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/checkout/:topic" element={<CheckoutWallet />} />
            <Route path="/buy-now/:idProduct" element={<OrderConfirmation />} />
            <Route path="/my-orders/buyer" element={<BuyerComponent />} />
            <Route path="/my-orders/seller" element={<SellerComponent />} />
          </Route>
        </Route>
        <Route path="/404-not-found" element={<NotFoundPage />} />
        <Route element={<AdminPubliceRouter />}>
          <Route path='/admin/login' element={<LoginAdmin />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route element={<AdminPrivateRouter />}>
            <Route path='/admin' element={<Dashboard />} />
            <Route path='/admin/khach-hang' element={<ListUser />} />
            <Route path='/admin/danh-muc' element={<ListCategory />} />
            <Route path='/admin/danh-muc-chi-tiet/:slug' element={<ListCategoryDetail />} />
            <Route path='/admin/san-pham' element={<ListProduct />} />
            <Route path='/admin/thong-so-ky-thuat' element={<ListSpecification />} />
            <Route path='/admin/thong-so-ky-thuat/:id' element={<EditSpecification />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export { Router };
