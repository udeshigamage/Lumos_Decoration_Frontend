import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import Layoutdash from "../Dashboard/Layoutdash";
import Employee from "../Dashboard/Employee";
import Services from "../CustomerInterface/Services";
import Addtobooking from "../CustomerInterface/Addtobooking";
import Ordersummary from "../CustomerInterface/Ordersummary";
import SideNavigationPanel from "../Dashboard/Drawer";
import SideNavigationPanel2 from "../Employeeinterface/SideNavigation";
import Pendingorder from "../Employeeinterface/Pendingorder";
import Requestorder from "../Employeeinterface/Requestorder";
const router = createBrowserRouter([
  { path: "/", element: <Layout /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/customer/services", element: <Services /> },
  { path: "customer/addtobooking", element: <Addtobooking /> },
  { path: "customer/ordersummary", element: <Ordersummary /> },
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
