import React, { useState } from "react";
import { render } from "react-dom";
import Employee from "../Employee";
import Role from "./Role";

const Employeemain = () => {
  const [activeTab, setactivetab] = useState(0);
  const tab = [
    {
      tab: 1,
      title: "Role",
      component: <Role />,
    },
    {
      tab: 2,
      title: "Employee",
      component: <Employee />,
    },
  ];
  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-2 position:relative">
          {tab.map((tab, index) => (
            <div className="bg-black  p-2">
              <button
                key={index}
                className="px-6 py-2 "
                onClick={() => setactivetab(index)}
              >
                {tab.title}
              </button>
            </div>
          ))}
        </div>
        <div>{tab[activeTab].component}</div>
      </div>
    </div>
  );
};

export default Employeemain;
