import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import Layoutdash from "../Dashboard/Layoutdash";
import Employee from "../Dashboard/Employee";
import Services from "../CustomerInterface/Services";
import Addtobooking from "../CustomerInterface/Addtobooking";

import SideNavigationPanel2 from "../Employeeinterface/SideNavigation";
import Pendingorder from "../Employeeinterface/Pendingorder";
import Requestorder from "../Employeeinterface/Requestorder";
import Revision from "../Web/Revision";
import Garlends from "../CustomerInterface/Garlends";
import Candledecorations from "../CustomerInterface/Candledecorations";
import Flowerboquets from "../CustomerInterface/Flowerboquets";
import Customdecoratons from "../CustomerInterface/Customdecoratons";
import Orderhistory from "../CustomerInterface/Orderhistory";
import Mycart from "../CustomerInterface/Mycart";

import Categorylist from "../CustomerInterface/Categorylist";

import Productlist from "../CustomerInterface/Productlist";
import Checkout from "../CustomerInterface/Checkout";
const router = createBrowserRouter([
  { path: "/", element: <Layout /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/customer/services", element: <Services /> },
  { path: "customer/addtobooking", element: <Addtobooking /> },

  { path: "customer/category/garlands", element: <Garlends /> },
  { path: "customer/orderhistory", element: <Orderhistory /> },
  { path: "customer/mycart", element: <Mycart /> },

  { path: "customer/services/categorylist/:id", element: <Categorylist /> },
  {
    path: "customer/services/categorylist/:id/productlist/:id",
    element: <Productlist />,
  },
  { path: "customer/services/checkout", element: <Checkout /> },
  {
    path: "customer/category/candle-decorations",
    element: <Candledecorations />,
  },
  { path: "customer/category/flower-bouquets", element: <Flowerboquets /> },
  {
    path: "customer/category/custom-decorations",
    element: <Customdecoratons />,
  },
  {
    path: "employee",
    element: <SideNavigationPanel2 />,
  },
  {
    path: "employee/pendingorder",
    element: <Pendingorder />,
  },
  {
    path: "employee/requestorder",
    element: <Requestorder />,
  },
  {
    path: "/revision",
    element: <Revision />,
  },

  {
    path: "/app",
    element: <Layoutdash />,
    children: [{ path: "employee", element: <Employee /> }],
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
