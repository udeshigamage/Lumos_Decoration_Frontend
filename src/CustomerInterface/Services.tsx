import React from "react";

import flower2 from "../assets/flower_1.jpg";
import Navbarcustomer from "./Navbarcustomer";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div>
      <Navbarcustomer />
      <div>
        <div className="flex flex-col  m-5 mt-20 ">
          <div className="bg-slate-300 rounded-lg basis-1/5 border-4  border-b-white p-2">
            <div className="flex flex-row w-full min-w-full">
              <div className="basis-1/5 bg-black h-32">
                <img src={flower2} className="h-full w-full object-cover" />
              </div>
              <div className="basis-3/5 bg-slate-400 p-2">
                <h1 className="text-black font-serif">FlowerBoquet</h1>
              </div>
              <div className="basis-1/5 bg-slate-400 flex justify-end"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
