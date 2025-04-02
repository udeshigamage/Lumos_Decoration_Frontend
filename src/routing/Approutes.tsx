import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
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
import { lazy } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reduxstore/Store_";
import PrivateRoutes from "./privateRoutes";
import ViewOrderdetails from "../Dashboard/ViewOrderdetails";
import ViewCustomerOrderdetails from "../Dashboard/ViewCustomerOrderdetails";
import ViewOrderdetailsEmployee from "../Employeeinterface/ViewOrderdetailsEmployee";

const Logindetails = lazy(() => import("../CustomerInterface/Logindetails"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes */}
      <Route path="/" element={<Layout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Private Routes (Protected) */}
      <Route element={<PrivateRoutes />}>
        <Route path="/customer/services" element={<Services />} />
        <Route path="/customer/addtobooking" element={<Addtobooking />} />
        <Route path="/customer/category/garlands" element={<Garlends />} />
        <Route path="/customer/orderhistory" element={<Orderhistory />} />
        <Route path="/customer/mycart" element={<Mycart />} />
        <Route
          path="/customer/services/categorylist/:id"
          element={<Categorylist />}
        />
        <Route
          path="/customer/services/categorylist/:id/productlist/:id"
          element={<Productlist />}
        />
        <Route path="/customer/services/checkout" element={<Checkout />} />
        <Route
          path="/customer/category/candle-decorations"
          element={<Candledecorations />}
        />
        <Route
          path="/customer/category/flower-bouquets"
          element={<Flowerboquets />}
        />
        <Route
          path="/customer/category/custom-decorations"
          element={<Customdecoratons />}
        />
        <Route path="/employee" element={<SideNavigationPanel2 />} />
        <Route path="/employee/pendingorder" element={<Pendingorder />} />
        <Route path="/employee/requestorder" element={<Requestorder />} />
        <Route path="/revision" element={<Revision />} />
        <Route path="/logindetails" element={<Logindetails />} />
        <Route path="/app" element={<Layoutdash />}>
          <Route path="employee" element={<Employee />} />
        </Route>
        <Route
          path="/app/ViewOrderdetails/:id"
          element={<ViewOrderdetails />}
        />
        <Route
          path="/app/Viewcustomerorder/:id"
          element={<ViewCustomerOrderdetails />}
        />
        <Route
          path="/employee/Viewemployeeorder/:id"
          element={<ViewOrderdetailsEmployee />}
        />
      </Route>
    </>
  )
);

const Approutes = () => {
  return <RouterProvider router={router} />;
};

export default Approutes;
