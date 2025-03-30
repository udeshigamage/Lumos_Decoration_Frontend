import React from "react";
import { useSelector } from "react-redux";
import RootState from "../reduxstore/Userslice";

const Logindetails = () => {
  const user = useSelector((state: any) => state.user);
  return (
    <div>
      <h2>Welcome, {user}</h2>
    </div>
  );
};

export default Logindetails;
