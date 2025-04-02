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

const ViewOrderdetails = () => {
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
  const [employee, setemployee] = useState([]);
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
      const employee = await axios.get(`${API_URL}/Employee/EmployeeList`);
      setemployee(employee.data);
    } catch {
      toast.error("error fetching employee list");
    } finally {
      setTimeout(() => {
        setisloading(false);
      }, 1000);
    }
  };

  const options = employee.map((item: any) => ({
    value: item.User_ID,
    label: item.Name,
  }));
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
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-red-600 mb-4">Order Details</h2>
          <div className="text-gray-700 space-y-3">
            <p>
              <strong>Order Status:</strong>{" "}
              <span
                className={`px-3 py-1 ml-3 rounded-full text-sm font-semibold ${getStatusColor(
                  order?.Order_status
                )}`}
              >
                {finanicialdata.Order_status ?? "-"}
              </span>
            </p>
            <p>
              <strong>Order Date:</strong>{" "}
              {order?.Order_date
                ? moment(order?.Order_date).format("YYYY-MM-DD")
                : "-"}
            </p>
            <p>
              <strong>Deadline Date:</strong>{" "}
              {order?.Order_deadlinedate
                ? moment(order?.Order_deadlinedate).format("YYYY-MM-DD")
                : "-"}
            </p>
            <p>
              <strong>Order Description:</strong>{" "}
              {order?.Order_description ?? "-"}
            </p>
          </div>
        </div>

        {/* Customer Details Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Customer Details
          </h2>
          <div className="text-gray-700 space-y-3">
            <p>
              <strong>Customer Name:</strong> {order?.Customer?.Name ?? "-"}
            </p>
            <p>
              <strong>Customer Email:</strong> {order?.Customer?.Email ?? "-"}
            </p>
            <p>
              <strong>Customer Address:</strong>{" "}
              {order?.Customer?.Address ?? "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Order Items Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-red-600 mb-4">Order Items</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-3 px-4 text-left border">Product Name</th>
                <th className="py-3 px-4 text-left border">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {order?.OrderItems?.length > 0 ? (
                order.OrderItems.map((item: any, index: number) => (
                  <tr key={index} className="border">
                    <td className="py-3 px-4">{item?.ProductName ?? "-"}</td>
                    <td className="py-3 px-4">{item?.quantity ?? "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="text-center py-3 text-gray-500">
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Financial Details */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-red-600 mb-4">
          Order Financial Details
        </h2>
        <div className="text-gray-700 space-y-3">
          {/* Order Status */}
          <div className="flex items-center gap-4">
            <p>
              <strong>Order Status:</strong>{" "}
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                  order?.Order_status
                )}`}
              >
                {order?.Order_status ?? "-"}
              </span>
            </p>
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md transition hover:bg-gray-900 hover:scale-105"
              onClick={() => setOrderstatusmodelopen(true)}
            >
              Edit
            </button>
            {order?.Order_status === "confirmed" && (
              <>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition hover:bg-blue-700 hover:scale-105"
                  onClick={() => setisAssignemployeemodelopen(true)}
                >
                  {order?.Employee?.Name != null
                    ? "Edit Assign"
                    : "Assign Employee"}
                </button>
              </>
            )}
            {order?.Employee?.Name && (
              <p className="mt-2 text-gray-700">
                Assigned Employee: {order?.Employee?.Name}
              </p>
            )}
          </div>

          {/* Display Employee Details if Assigned */}

          {/* Order Allowance */}
          <p>
            <strong>Order Allowance:</strong> ${order?.Order_allowance ?? "-"}
          </p>

          <div className="flex items-center gap-4">
            <p>
              <strong>Allowance Status:</strong>{" "}
              <span
                className={`px-3 py-2 text-white text-sm font-semibold rounded-lg ${
                  order?.Order_allowance_status ? "bg-green-600" : "bg-red-700"
                }`}
              >
                {order?.Order_allowance_status ? "Paid" : "Not Paid"}
              </span>
            </p>
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md transition hover:bg-gray-900 hover:scale-105"
              onClick={() => setAllowancestatusmodelopen(true)}
            >
              Edit
            </button>
          </div>

          {/* Total Cost */}
          <p>
            <strong>Total Cost:</strong> ${order?.Total_cost ?? "-"}
          </p>

          <div className="flex items-center gap-4">
            <p>
              <strong>Payment Status:</strong>{" "}
              <span
                className={`px-3 py-2 text-white text-sm font-semibold rounded-lg ${
                  order?.Order_payment_status ? "bg-green-600" : "bg-red-700"
                }`}
              >
                {order?.Order_payment_status ? "Paid" : "Not Paid"}
              </span>
            </p>
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md transition hover:bg-gray-900 hover:scale-105"
              onClick={() => setPaymentstatusmodelopen(true)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      {isPaymentstatusmodelopen && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white w-[300px] p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
                Are you sure you want to update the payment status?
              </h2>

              <div className="flex justify-around">
                <button
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                  onClick={() => {
                    updatepaymentstatus();
                  }}
                >
                  Yes
                </button>

                <button
                  className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
                  onClick={() => {
                    setPaymentstatusmodelopen(false);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {isAllowancestatusmodelopen && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white w-[300px] p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
                Are you sure you want to update the Allowance status?
              </h2>

              <div className="flex justify-around">
                <button
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                  onClick={() => {
                    updateallowancestatus();
                  }}
                >
                  Yes
                </button>

                <button
                  className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
                  onClick={() => {
                    setAllowancestatusmodelopen(false);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {isOrderstatusmodelopen && (
        <>
          (
          <>
            {isOrderstatusmodelopen && (
              <>
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                  <div className="bg-white w-[300px] p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
                      Are you sure you want to update the Order status?
                    </h2>

                    {/* Select Dropdown */}
                    <div className="mb-4">
                      <label
                        htmlFor="orderStatus"
                        className="block text-gray-600 mb-2"
                      >
                        Select Order Status
                      </label>
                      <select
                        id="orderStatus"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        onChange={(e) => setselecetdstatus(e.target.value)} // Pass the selected value
                      >
                        <option value="pending">Pending</option>
                        <option value="denied">Denied</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="processing">Processing</option>
                      </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-around">
                      <button
                        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                        onClick={() => {
                          updateorderstatus();
                          // Handle status update here, e.g., updateOrderStatus(selectedStatus);
                        }}
                      >
                        Yes
                      </button>

                      <button
                        className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
                        onClick={() => {
                          setOrderstatusmodelopen(false);
                        }}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
          )
        </>
      )}

      {isAssignemployeemodelopen && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white w-[300px] p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
                Please select employee
              </h2>
              <Formik
                initialValues={{
                  Employee_Id: "",
                }}
                onSubmit={async (values, { resetForm }) => {
                  setisloading(true);
                  try {
                    const emloyee_ = values.Employee_Id;
                    console.log(emloyee_);
                    await axios.post(
                      `${API_URL}/Order/${order.Order_ID}/assignemployee/${emloyee_}`
                    );
                    toast.success("assigned successfully");
                    fetchorder_financials();
                  } catch {
                    toast.error("error in assigning employee");
                  } finally {
                    setTimeout(() => {
                      setisloading(false);
                    }, 1000);
                    resetForm();
                    setisAssignemployeemodelopen(false);
                  }
                }}
              >
                {({ values, setFieldValue, handleSubmit, resetForm }) => (
                  <>
                    <Form onSubmit={handleSubmit}>
                      <Select
                        options={options}
                        value={options.find(
                          (option) => option.value === values.Employee_Id
                        )}
                        onChange={(option: any) =>
                          setFieldValue("Employee_Id", option?.value)
                        }
                      />
                      <div className="flex flex-row position-relative gap-3">
                        <button type="submit">Submit</button>
                        <button
                          onClick={() => {
                            setisAssignemployeemodelopen(false);
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </Form>
                  </>
                )}
              </Formik>
            </div>
          </div>
        </>
      )}
      {isloading && <CommonLoading />}
    </div>
  );
};

export default ViewOrderdetails;
