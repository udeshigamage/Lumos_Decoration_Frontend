import React from "react";
import Employee from "./Employee";
import Drawer from "./Drawer";
import { Route, Routes } from "react-router-dom";
import SideNavigationPanel from "./Drawer";

const Layoutdash = () => {
  return (
    <div>
      <SideNavigationPanel />
    </div>
  );
};

export default Layoutdash;
