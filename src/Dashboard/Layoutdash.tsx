import React from "react";
import Employee from "./Employee";
import Drawer from "./Drawer";

const Layoutdash = () => {
  return (
    <div>
      <div className="flex flex-row">
        <div className="basis-3/12">
          <Drawer />
        </div>
        <div className="basis-9/12">
          <Employee />
        </div>
      </div>
    </div>
  );
};

export default Layoutdash;
