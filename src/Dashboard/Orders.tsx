import axios from "axios";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";

import * as Yup from "yup";

//   // setIsLoading(true)
//   try {
//     // let response = await axios.post(`${API_URL}/Employee`);

//     // setcustomers(response.data.data);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     //setIsLoading(false)
//   }
// };
import pic045 from "../assets/pic56.jpg";
const API_URL = import.meta.env.VITE_API_URL;
const Order = () => {
  const [Order, setOrder] = useState([]);
  const [ismodelopen, setmodelopen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, settotalitems] = useState(0);

  const pageSize = 5;
  const OrderSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    contactno: Yup.string().matches(
      /^\+?[1-9]\d{1,14}$/,
      "Contact number must be valid"
    ),
    role: Yup.string().required("Role is required"),
    Allowance: Yup.number().required("Allowance is required"),
  });
  useEffect(() => {
    fetchorder(currentPage);
  }, [currentPage]);

  const fetchorder = async (page: number) => {
    console.log(API_URL);
    try {
      let response = await axios.get(
        `${API_URL}/Order?page=${page}&pageSize=${pageSize}`
      );

      setOrder(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      settotalitems(response.data.totalItems);
    } catch (error) {
      console.log(error);
    }
  };
  const handledelete = async (id: any) => {
    try {
      await axios.delete(`${API_URL}/Order/${id}`);
    } catch (error) {
      console.log(error);
    }
    fetchorder(currentPage);
  };
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="px-5 py-5 rounded-lg ">
        {" "}
        <div className="flex flex-row items-center justify-between w-full">
          <div className="">
            <h1 className="text-4xl text-black font-bold font-serif">Orders</h1>
          </div>
          <div className="flex items-center gap-4 px-5">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-full p-2 border rounded-lg pl-10"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <button
              className="btn"
              onClick={() => {
                setSelectedOrder(null);
                setmodelopen(true);
              }}
            >
              Order Details
            </button>
          </div>
        </div>
      </div>
      <div>
        <div style={{ minHeight: "calc(100vh - 320px)" }}>
          <div className="overflow-x-auto">
            <table
              className="table border-white bg-red-100 opacity-90 text-black"
              style={{
                backgroundImage: `url(${pic045})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* head */}
              <thead className="text-black text-xl">
                <tr>
                  {/* <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th> */}

                  <th>Customer</th>
                  <th>Order date</th>
                  <th>Deadline date</th>
                  <th>Status</th>
                  <th>Order Allowance status</th>
                  <th>Order description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Order?.length > 0 ? (
                  Order?.map((item: any, index: any) => (
                    <tr>
                      <td>
                        <div className="d-flex justify-content-start flex-column">
                          <a className="text-black text-hover-primary fs-6">
                            {item?.Customer.Customer_name ?? "-"}
                          </a>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-start flex-column">
                          <a className="text-black text-hover-primary ">
                            {item?.Order_date ?? "-"}
                          </a>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-start flex-column">
                          <a className="text-black text-hover-primary fs-6 ">
                            {item?.Order_deadlinedate ?? "-"}
                          </a>
                        </div>
                      </td>
                      <td>
                        <a className="text-black font-semibold text-lg text-hover-primary fs-6">
                          {item?.Order_status ?? "-"}
                        </a>
                      </td>
                      <td>
                        <div className="d-flex justify-center flex-column">
                          <a className="text-black font-semibold text-lg text-hover-primary fs-6">
                            {item?.Order_allowance_status === true
                              ? "paid"
                              : "not paid"}
                          </a>
                        </div>
                      </td>
                      <td>
                        <a className="text-black font-semibold text-lg text-hover-primary fs-6">
                          {item?.Order_description ?? "-"}
                        </a>
                      </td>
                      <td>
                        <div className="flex ">
                          <div className="px-5">
                            <button
                              className="bg-black text-white px-2 py-2  rounded-md"
                              onClick={() => {
                                setSelectedOrder(item);
                                setmodelopen(true);
                              }}
                            >
                              View
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>
                      <div className="py-5 d-flex flex-column align-content-center justify-content-center">
                        <div className="text-center">
                          <div className="symbol symbol-200px ">
                            <img src="/media/other/nodata.png" alt="" />
                          </div>
                        </div>
                        <div className="d-flex text-center w-100 align-content-center justify-content-center fw-semibold fs-3 text-gray-400">
                          No matching records found
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
              {/* foot */}
            </table>
            <div className="flex flex-col items-end">
              <div className="pagination ">
                <button
                  className="btn mt-5 mr-5 bg-black"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </button>
                <span className="text-black">
                  Page {currentPage} of {totalPages}: {totalItems}
                </span>
                <button
                  className="btn ml-5 bg-black"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {ismodelopen && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Order Details</h3>
            <Formik
              initialValues={{
                order_ID: selectedOrder ? selectedOrder.order_ID : "",
                CustomerID: selectedOrder
                  ? selectedOrder.customer_ID || ""
                  : "",
                employee: selectedOrder?.employee || "",
                status: selectedOrder?.status || "Pending",
                orderdescription: selectedOrder?.orderdescription || "",
                totalCost: selectedOrder?.totalCost || "",
              }}
              validationSchema={OrderSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                setSubmitting(true);

                // try {

                //     // If adding a new employee, send POST request
                //     await axios.post(`${API_URL}/Order`, {
                //       Order_Id: ` ${values}`,
                //       emp_address: values.Address,
                //       email: values.email,

                //     });

                //   resetForm();
                //   setmodelopen(false);
                //   fetchorder();
                // } catch (e) {
                //   console.error("Error:", e);
                // }
              }}
            >
              {({
                handleChange,
                values,
                setFieldValue,
                handleSubmit,
                errors,
                isSubmitting,
                resetForm,
                touched,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="flex position-relative gap-4">
                    <div className="mt-5">
                      <label className="label">Order ID:</label>
                      <input
                        type="text"
                        name="order_ID"
                        className="input input-bordered w-full "
                        value={values.order_ID}
                        disabled
                      />
                    </div>
                    <div className="mt-5">
                      <label className="label">Customer ID:</label>
                      <input
                        type="text"
                        name="customerID"
                        className="input input-bordered w-full "
                        value={values.CustomerID}
                        disabled
                      />
                    </div>
                  </div>
                  <label className="label mt-5">Description:</label>
                  <textarea
                    className="textarea textarea-bordered w-full "
                    name="orderdescription"
                    placeholder="Description"
                    value={values.orderdescription}
                    onChange={(e) =>
                      setFieldValue("orderdescription", e.target.value)
                    }
                    disabled
                  ></textarea>
                  <label className="label mt-5">Total Cost:</label>
                  <input
                    type="number"
                    name="totalcost"
                    className="input input-bordered w-full "
                    value={values.totalCost}
                    disabled
                  />

                  <div className="mt-5 flex flex-col">
                    <div>
                      <label className="label">Status:</label>
                      <select
                        className="select select-bordered w-full "
                        name="status"
                        onChange={(e) =>
                          setFieldValue("status", e.target.value)
                        }
                        value={values.status}
                      >
                        <option disabled value="">
                          Select Status
                        </option>
                        <option value="Accepted order">Accept order</option>
                        <option value="Started working">Started working</option>
                        <option value="Completed Order">Completed Order</option>
                        <option value="Handed over">Handed over</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                    <div>
                      <label className="label mt-5">Employee:</label>
                      <select
                        className="select select-bordered w-full "
                        name="employee"
                        onChange={(e) =>
                          setFieldValue("employee", e.target.value)
                        }
                        value={values.employee}
                      >
                        <option disabled value="">
                          Select Employee
                        </option>
                        <option value="Floral Designer">Floral Designer</option>
                        <option value="Event Stylist">Event Stylist</option>
                        <option value="Visual Merchandiser">
                          Visual Merchandiser
                        </option>
                        <option value="Event Coordinator">
                          Event Coordinator
                        </option>
                        <option value="Customer Service Representative">
                          Customer Service Representative
                        </option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="modal-action">
                    <div className="flex positon-relative gap-5">
                      <button
                        type="submit"
                        className="btn"
                        data-kt-users-modal-action="submit"
                      >
                        Submit
                      </button>

                      <button
                        type="button"
                        className="btn"
                        onClick={() => {
                          setmodelopen(false);
                          resetForm;
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                  {/* <pre>Values: {JSON.stringify(values, null, 2)}</pre>
                  <pre>Errors: {JSON.stringify(errors, null, 2)}</pre>
                  <pre>Is Submitting: {JSON.stringify(isSubmitting)}</pre> */}
                </Form>
              )}
            </Formik>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Order;
