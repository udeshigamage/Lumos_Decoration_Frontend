import React from "react";
import Employee from "./Employee";
import Drawer from "./Drawer";

const Layoutdash = () => {
  return (
    <div>
      <div className="flex flex-row">
        <Drawer />
        <Employee />
      </div>
    </div>
  );
};

export default Layoutdash;
