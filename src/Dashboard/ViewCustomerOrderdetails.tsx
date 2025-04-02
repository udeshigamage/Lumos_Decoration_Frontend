import React, { useEffect, useState } from "react";
import { Form, useLocation, useNavigate } from "react-router-dom";
import pic045 from "../assets/pic56.jpg";
import moment from "moment";
import CommonLoading from "../Util/Commonloading";
import axios from "axios";
import { toast } from "react-toastify";
import { Formik } from "formik";
import Employee from "./Employee";
import Select from "react-select";

const ViewCustomerOrderdetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL;
  const [isloading, setisloading] = useState(false);
  const [isPaymentstatusmodelopen, setPaymentstatusmodelopen] = useState(false);
  const [isAllowancestatusmodelopen, setAllowancestatusmodelopen] =
    useState(false);
  const [finanicialdata, setfinancialdata] = useState<any>([]);

  const [isOrderstatusmodelopen, setOrderstatusmodelopen] = useState(false);
  const [selectemployee, setselectedemployee] = useState("");
  const [customerorder, setcustomerorder] = useState([]);
  const [selectedStatus, setselecetdstatus] = useState("");
  const [isAssignemployeemodelopen, setisAssignemployeemodelopen] =
    useState(false);
  const order = location?.state?.Order;
  const updateallowancestatus = async () => {
    setisloading(true);
    try {
      await axios.post(
        `${API_URL}/Order/updatestatusofallowance/${order?.Order_ID}`
      );
      toast.success("updated successfully");
      await fetchorder_financials();
    } catch {
      toast.error("Error updating");
    } finally {
      setTimeout(() => {
        setisloading(false);
      }, 1000);
      setAllowancestatusmodelopen(false);
    }
  };
  const fetchemployee = async () => {
    setisloading(true);
    try {
      const order_ = await axios.get(
        `${API_URL}/Order/Orders/${order.User_ID}`
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
  const updatepaymentstatus = async () => {
    setisloading(true);
    try {
      await axios.post(
        `${API_URL}/Order/updatestatusofpayment/${order?.Order_ID}`
      );
      toast.success("updated successfully");
      await fetchorder_financials();
    } catch {
      toast.error("Error updating");
    } finally {
      setTimeout(() => {
        setisloading(false);
      }, 1000);
      setPaymentstatusmodelopen(false);
    }
  };

  const updateorderstatus = async () => {
    setisloading(true);
    try {
      await axios.post(
        `${API_URL}/Order/updatestatusoforder/${order?.Order_ID}?status=${selectedStatus}`
      );
      toast.success("updated successfully");

      await fetchorder_financials();
    } catch {
      toast.error("Error updating");
    } finally {
      setTimeout(() => {
        setisloading(false);
      }, 1000);
      setOrderstatusmodelopen(false);
    }
  };
  const fetchorder_financials = async () => {
    setisloading(true);
    try {
      const finance_data = await axios.get(
        `${API_URL}/Order/orderfinancialdetails/${order?.Order_ID}`
      );

      console.log(finance_data.data[0]);
    } catch {
      toast.error("Error updating");
    } finally {
      setTimeout(() => {
        setisloading(false);
      }, 1000);
    }
  };

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
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div
      className="h-screen p-8 flex flex-col gap-6"
      style={{
        backgroundImage: `url(${pic045})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center w-full">
        <button
          className="bg-red-600 text-white font-bold px-5 py-3 rounded-md shadow-md hover:bg-red-700 transition"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <h1 className="text-3xl font-bold text-white bg-black px-5 py-2 rounded-md shadow-lg">
          View Order Details
        </h1>
      </div>

      {/* Order Details & Customer Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Details Card */}

        {/* Customer Details Card */}
        <div className="bg-red-300 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Customer Details
          </h2>
          <div className="text-gray-700 space-y-3">
            <p>
              <strong>Customer Name:</strong> {order?.Name ?? "-"}
            </p>
            <p>
              <strong>Customer Email:</strong> {order?.Email ?? "-"}
            </p>
            <p>
              <strong>Customer Address:</strong> {order?.Address ?? "-"}
            </p>
            <p>
              <strong>Customer Contact no:</strong> {order?.Contact_no ?? "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Order Items Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-rose-300 ">
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
          <tbody className="bg-red-200">
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
                      order?.Order_status
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Financial Details */}

      {isloading && <CommonLoading />}
    </div>
  );
};

export default ViewCustomerOrderdetails;
