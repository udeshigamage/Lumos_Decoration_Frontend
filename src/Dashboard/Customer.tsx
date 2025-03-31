import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import * as Yup from "yup";
import pic045 from "../assets/pic56.jpg";

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
const API_URL = import.meta.env.VITE_API_URL;
const Customer = () => {
  const [Customer, setCustomer] = useState([]);
  const [ismodelopen, setmodelopen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, settotalitems] = useState(0);

  const pageSize = 5;

  const CustomerSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),

    contactno: Yup.string().matches(
      /^\+?[1-9]\d{1,14}$/,
      "Contact number must be valid"
    ),
  });
  useEffect(() => {
    fetchcustomers(currentPage);
  }, []);

  const fetchcustomers = async (page: number) => {
    console.log(API_URL);
    try {
      let response = await axios.get(
        `${API_URL}/Customer?page=${page}&pageSize=${pageSize}`
      );

      setCustomer(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      settotalitems(response.data.totalItems);
    } catch (error) {
      console.log(error);
    }
  };
  const handledelete = async (id: any) => {
    try {
      await axios.delete(`${API_URL}/Customer/${id}`);
    } catch (error) {
      console.log(error);
    }
    fetchcustomers(currentPage);
  };
  useEffect(() => {
    fetchcustomers(currentPage);
  }, [currentPage]);

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
            <h1 className="text-4xl text-black font-bold font-serif">
              Customer
            </h1>
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
                setSelectedCustomer(null);
                setmodelopen(true);
              }}
            >
              Add Customer
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

                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact no</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Customer?.length > 0 ? (
                  Customer?.map((item: any, index: any) => (
                    <tr>
                      {/* <td>
                        <div className="d-flex justify-content-start flex-column">
                          <a className="text-black text-hover-primary fs-6">
                            {item?.Customer_ID ?? "-"}
                          </a>
                        </div>
                      </td> */}

                      <td>
                        <div className="d-flex justify-content-start flex-column">
                          <a className="text-black font-semibold text-lg text-hover-primary fs-6">
                            {item?.Name ?? "-"}
                          </a>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-start flex-column">
                          <a className="text-black font-semibold text-lg text-hover-primary fs-6">
                            {item?.Email ?? "-"}
                          </a>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-start flex-column">
                          <a className="text-black font-semibold text-lg text-hover-primary fs-6">
                            {item?.Contact_no ?? "-"}
                          </a>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-start flex-column">
                          <a className="text-black font-semibold text-lg text-hover-primary fs-6">
                            {item?.Address ?? "-"}
                          </a>
                        </div>
                      </td>

                      <td>
                        <div className="flex position-relative">
                          <div className="px-5">
                            <button
                              className="bg-black text-white px-2 py-2  rounded-md"
                              onClick={() => {
                                setSelectedCustomer(item);
                                setmodelopen(true);
                              }}
                            >
                              Edit
                            </button>
                          </div>
                          <div>
                            <button
                              className="bg-black text-white px-2 py-2  rounded-md"
                              onClick={() => {
                                handledelete(item?.Customer_ID);
                              }}
                            >
                              Delete
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
            <h3 className="font-bold text-lg">Add Customer</h3>
            <Formik
              initialValues={{
                firstName: selectedCustomer ? selectedCustomer.name : "",

                email: selectedCustomer?.email || "",
                Address: selectedCustomer?.address || "",
                contactno: selectedCustomer?.contactno || "",
              }}
              validationSchema={CustomerSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                setSubmitting(true);

                try {
                  if (selectedCustomer) {
                    // If editing, send PUT request
                    await axios.put(
                      `${API_URL}/Customer/${selectedCustomer.customer_ID}`,
                      {
                        name: `${values.firstName} `,
                        address: values.Address,
                        email: values.email,
                        contactno: values.contactno,
                      }
                    );
                  } else {
                    // If adding a new employee, send POST request
                    await axios.post(`${API_URL}/Customer`, {
                      name: `${values.firstName}`,
                      address: values.Address,
                      email: values.email,
                      contactno: values.contactno,
                    });
                  }
                  resetForm();
                  setmodelopen(false);
                  fetchcustomers(currentPage);
                } catch (e) {
                  console.error("Error:", e);
                }
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
                  <div className="py-5">
                    <input
                      type="text"
                      placeholder="First name"
                      className="input input-bordered w-full"
                      onChange={(e) =>
                        setFieldValue("firstName", e.target.value)
                      }
                      value={values.firstName}
                    />
                    {touched.firstName && errors.firstName && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {/* <span role="alert">{errors.firstName}</span> */}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="py-5">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      className="input input-bordered w-full "
                      onChange={(e) => setFieldValue("email", e.target.value)}
                      value={values.email}
                    />
                  </div>
                  <div className="py-5">
                    <textarea
                      name="address"
                      placeholder="Address"
                      className="textarea textarea-bordered w-full"
                      onChange={(e) => setFieldValue("Address", e.target.value)}
                      value={values.Address}
                    />
                  </div>
                  <div className="mt-5">
                    <input
                      name="contactno"
                      type="text"
                      placeholder="Contact Number (+94760305481)"
                      className="input input-bordered w-full "
                      onChange={(e) =>
                        setFieldValue("contactno", e.target.value)
                      }
                      value={values.contactno}
                    />
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
                  <pre>Values: {JSON.stringify(values, null, 2)}</pre>
                  <pre>Errors: {JSON.stringify(errors, null, 2)}</pre>
                  <pre>Is Submitting: {JSON.stringify(isSubmitting)}</pre>
                </Form>
              )}
            </Formik>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Customer;
