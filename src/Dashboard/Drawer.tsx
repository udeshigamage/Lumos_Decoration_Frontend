import React from "react";
import Employee from "./Employee";
import Customer from "./Customer";

const SideNavigationPanel = () => {
  const [activeComponent, setActiveComponent] = React.useState("Employee");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Employee":
        return <Employee />;

      case "Customers":
        return <Customer />;
      case "Settings":
      // return <Settings />;
      default:
      // return <Employee />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Side Navigation Panel */}
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Menu</h2>
        <ul className="space-y-2">
          <li
            className={`p-2 cursor-pointer rounded-lg hover:bg-gray-700 ${
              activeComponent === "Employee" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveComponent("Employee")}
          >
            Employee
          </li>
          <li
            className={`p-2 cursor-pointer rounded-lg hover:bg-gray-700 ${
              activeComponent === "Settings" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveComponent("Settings")}
          >
            Settings
          </li>
          <li
            className={`p-2 cursor-pointer rounded-lg hover:bg-gray-700 ${
              activeComponent === "Customers" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveComponent("Customers")}
          >
            Customers
          </li>
        </ul>
      </div>

      {/* Content Display */}
      <div className="w-3/4 p-6">{renderComponent()}</div>
    </div>
  );
};

export default SideNavigationPanel;
