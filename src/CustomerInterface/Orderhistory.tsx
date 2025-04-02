import { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import Trackorder from "./Trackorder";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../reduxstore/Store_";
import { Formik } from "formik";
import CommonLoading from "../Util/Commonloading";

const Orderhistory = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [ismodelopen, setmodelopen] = useState<boolean>(false);
  const [customerorder, setcustomerorder] = useState([]);
  const [isloading, setisloading] = useState(false);
  const user = useSelector((state: RootState) => state.user.userData);

  const getStatusColor = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-500 text-white";
      case "denied":
        return "bg-red-500 text-white";
      case "confirmed":
        return "bg-blue-500 text-white";
      case "completed":
        return "bg-green-500 text-white";
      case "processing":
        return "bg-orange-500 text-white";
      default:
        return "bg-gray-500 text-white"; // Default color for unknown status
    }
  };
  const fetchemployee = async () => {
    setisloading(true);
    try {
      const order_ = await axios.get(
        `${API_URL}/Order/Orders/${user?.User_ID}`
      );
      setcustomerorder(order_.data);
    } catch {
      toast.error("error fetching employee list");
    } finally {
      setTimeout(() => {
        setisloading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchemployee();
  }, []);
  const handleOpenModal = () => {
    console.log("clicked");
    setmodelopen(true);
  };

  const handleCloseModal = () => {
    setmodelopen(false);
  };
  return (
    <div className="bg-gradient-to-r from-white to-red-200 min-h-screen">
      <div>
        <div className="flex flex-row justify-between bg-red-950 w-full p-5">
          <h1 className="font-serif text-lg font-bold text-white ">
            Order History
          </h1>
          <button
            className="btn btn-sm btn-primary text-white"
            onClick={() => {
              navigate("/customer/services");
            }}
          >
            Home
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Order Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Order Description
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Total Cost
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Order Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Assigned Employee
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {customerorder.map((order: any) => (
                <tr key={order?.Order_ID} className="border-b">
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {order.Order_ID}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(order.Order_date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {order.Order_description || "No Description"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {order.Orderitems && order.Orderitems.length > 0
                      ? order.Orderitems.map((item: any, index: any) => (
                          <span key={index} className="block">
                            {item.Product_Name} (Qty: {item.Quantity})
                          </span>
                        ))
                      : "No Items"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {order.TotalCost || "Not Available"}
                  </td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                        order.Order_status
                      )}`}
                    >
                      {order?.Order_status ?? "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {order.Employee ? order.Employee.Name : "Not Assigned"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition hover:bg-blue-700">
                      Edit Order
                    </button>
                    {order.Order_status === "completed" && (
                      <>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition hover:bg-blue-700">
                          Add feedback
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {ismodelopen && (
        <>
          <div className="fixed inset-0 flex flex-justify z-50 ">
            <div className="w-[500px] h-[200px] bg-white">
              <Formik
                initialValues={{}}
                onSubmit={(values) => {
                  try {
                  } catch {
                  } finally {
                  }
                }}
              >
                {({ getFieldProps, resetForm, handleSubmit }) => (
                  <Form>
                    <input type="text" {...getFieldProps("Order_ID")} />
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </>
      )}
      <Trackorder isopen={ismodelopen} isclose={handleCloseModal} />
      {isloading && <CommonLoading />}
    </div>
  );
};

export default Orderhistory;
