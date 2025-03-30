import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../reduxstore/Store_";

const PrivateRoutes = () => {
  const user = useSelector((state: RootState) => state.user.userData);

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
