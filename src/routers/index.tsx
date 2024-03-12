import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../components/admin/dashboard/dashboard.admin.component";
import ListUser from "../components/admin/users/listUsers.admin.component";
import AdminLayout from "../layouts/admin/admin.layout";
import ErrorPage from "../pages/error-page";


const PrivateRoutes = () => {

  return createBrowserRouter([
    {
      path: "/",
      element: <AdminLayout chirden={<Dashboard />} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/user",
      element: <AdminLayout chirden={<ListUser/>} />,
    }
  ]);
}

export { PrivateRoutes };
