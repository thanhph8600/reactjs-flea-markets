import { Route, Routes } from 'react-router-dom';
import Dashboard from "../components/admin/dashboard/dashboard.admin.component";
import ListUser from "../components/admin/users/listUsers.admin.component";
import AdminLayout from "../layouts/admin/admin.layout";
import ErrorPage from "../pages/error-page";
import LoginAdmin from '../components/admin/login.admin';
import { AdminPrivateRouter, AdminPubliceRouter } from './checkAdminRouter';
import Alert from '../components/admin/alert';
import ListCategory from '../components/admin/categories/listCategory';
import ListProduct from '../components/admin/product/listProduct';
const Router = () => {
  return (
    <Routes>
      <Route element={<Alert />} >
        <Route element={<AdminLayout />}>
          <Route element={<AdminPrivateRouter />}>
            <Route path='/admin' element={<Dashboard />} />
            <Route path='/admin/customer' element={<ListUser />} />
            <Route path='/admin/category' element={<ListCategory />} />
            <Route path='/admin/product' element={<ListProduct />} />
          </Route>
        </Route>
        <Route element={<AdminPubliceRouter />}>
          <Route path='/admin/login' element={<LoginAdmin />} />
        </Route>
        <Route path='**' element={<ErrorPage />} />
      </Route>
    </Routes>
  )
}

export { Router };
