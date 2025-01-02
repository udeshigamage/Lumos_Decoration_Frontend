import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import Layoutdash from "../Dashboard/Layoutdash";
import Employee from "../Dashboard/Employee";
const router = createBrowserRouter([
  { path: "/", element: <Layout /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/app",
    element: <Layoutdash />,
    children: [
      { path: "employee", element: <Employee /> },
      //   { path: "Product_Management", element: <ProductManagemnet /> },
      //   { path: "Masterdata", element: <Masterdata /> },
      //   { path: "Stock", element: <Stock /> },
    ],
  },
]);
const PrivateRoutes = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default PrivateRoutes;
