import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
const router = createBrowserRouter([
  { path: "/", element: <Layout /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  // {
  //   path: "/app",
  //   element: <Layout />,
  //   children: [
  //     { path: "dashboard", element: <DashBoard /> },
  //     { path: "Product_Management", element: <ProductManagemnet /> },
  //     { path: "Masterdata", element: <Masterdata /> },
  //     { path: "Stock", element: <Stock /> },
  //   ],
  // },
]);
const PrivateRoutes = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default PrivateRoutes;
