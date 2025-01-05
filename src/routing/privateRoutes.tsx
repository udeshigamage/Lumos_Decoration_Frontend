import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import Layoutdash from "../Dashboard/Layoutdash";
import Employee from "../Dashboard/Employee";
import Services from "../CustomerInterface/Services";
import Addtobooking from "../CustomerInterface/Addtobooking";
const router = createBrowserRouter([
  { path: "/", element: <Layout /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/customer/services", element: <Services /> },
  { path: "customer/addtobooking", element: <Addtobooking /> },

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
