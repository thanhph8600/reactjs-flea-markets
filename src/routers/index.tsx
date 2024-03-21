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
import { ClientPubliceRouter } from './checkClientRouter';
import ErrorPage from '../pages/error-page';
const Router = () => {
  return (
    <Routes>
      <Route element={<Alert />} >
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
        <Route element={<AdminPubliceRouter />}>
          <Route path='/admin/login' element={<LoginAdmin />} />
        </Route>
        <Route element={<ClientPubliceRouter />} >
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export { Router };
