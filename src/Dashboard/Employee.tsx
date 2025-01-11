import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
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
const API_URL = import.meta.env.VITE_API_URL;
const Employee = () => {
  const [Employee, setEmployee] = useState([]);
  const [ismodelopen, setmodelopen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const EmployeeSchema = Yup.object().shape({
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
    fetchemployees();
  }, []);

  const fetchemployees = async () => {
    console.log(API_URL);
    try {
      let response = await axios.get(`${API_URL}/Employee`);

      setEmployee(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handledelete = async (id: any) => {
    try {
      await axios.delete(`${API_URL}/Employee/${id}`);
    } catch (error) {
      console.log(error);
    }
    fetchemployees();
  };
  return (
    <div className="flex flex-col">
      <div className="px-5 py-5 rounded-lg ">
        {" "}
        <div className="flex flex-row items-center justify-between w-full">
          <div className="">
            <h1 className="text-2xl text-white font-bold font-serif">
              Employee
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
                setSelectedEmployee(null);
                setmodelopen(true);
              }}
            >
              Add Employee
            </button>
          </div>
        </div>
      </div>
      <div>
        <div style={{ minHeight: "calc(100vh - 320px)" }}>
          <div className="overflow-x-auto">
            <table className="table border-white bg-slate-700">
              {/* head */}
              <thead>
                <tr>
                  {/* <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th> */}
                  <th>Id</th>
                  <th>Name</th>
                  <th>Contact number</th>
                  <th>Role</th>
                  <th>Allowance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Employee?.length > 0 ? (
                  Employee?.map((item: any, index: any) => (
                    <tr>
                      <td>
                        <div className="d-flex justify-content-start flex-column">
                          <a className="text-white text-hover-primary fs-6">
                            {item?.emp_ID ?? "-"}
                          </a>
                        </div>
                      </td>

                      <td>
                        <div className="d-flex justify-content-start flex-column">
                          <a className="text-white text-hover-primary fs-6">
                            {item?.emp_Name ?? "-"}
                          </a>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-start flex-column">
                          <a className="text-white text-hover-primary ">
                            {item?.emp_contact_no ?? "-"}
                          </a>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-start flex-column">
                          <a className="text-white text-hover-primary fs-6 ">
                            {item?.emp_Role ?? "-"}
                          </a>
                        </div>
                      </td>
                      <td>
                        <a className=" text-hover-primary fs-6 px-5 py-5 rounded-md ">
                          {item?.emp_allowance ?? "-"}
                        </a>
                      </td>
                      <td>
                        <div className="flex position-relative">
                          <div className="px-5">
                            <button
                              className="bg-slate-200 text-black px-2 py-2  rounded-md"
                              onClick={() => {
                                setSelectedEmployee(item);
                                setmodelopen(true);
                              }}
                            >
                              Edit
                            </button>
                          </div>
                          <div>
                            <button
                              className="bg-slate-200 text-black px-2 py-2  rounded-md"
                              onClick={() => {
                                handledelete(item?.emp_ID);
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
          </div>
        </div>
      </div>
      {ismodelopen && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Employee</h3>
            <Formik
              initialValues={{
                firstName: selectedEmployee
                  ? selectedEmployee.emp_Name.split(" ")[0]
                  : "",
                lastName: selectedEmployee
                  ? selectedEmployee.emp_Name.split(" ")[1] || ""
                  : "",
                email: selectedEmployee?.email || "",
                Address: selectedEmployee?.emp_address || "",
                contactno: selectedEmployee?.emp_contact_no || "",
                role: selectedEmployee?.emp_Role || "",
                Allowance: selectedEmployee?.emp_allowance || "",
              }}
              validationSchema={EmployeeSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                setSubmitting(true);

                try {
                  if (selectedEmployee) {
                    // If editing, send PUT request
                    await axios.put(
                      `${API_URL}/Employee/${selectedEmployee.emp_ID}`,
                      {
                        emp_Name: `${values.firstName} ${values.lastName}`,
                        emp_address: values.Address,
                        email: values.email,
                        emp_Role: values.role,
                        emp_contact_no: values.contactno,
                        emp_allowance: values.Allowance,
                      }
                    );
                  } else {
                    // If adding a new employee, send POST request
                    await axios.post(`${API_URL}/Employee`, {
                      emp_Name: `${values.firstName} ${values.lastName}`,
                      emp_address: values.Address,
                      email: values.email,
                      emp_Role: values.role,
                      emp_contact_no: values.contactno,
                      emp_allowance: values.Allowance,
                    });
                  }
                  resetForm();
                  setmodelopen(false);
                  fetchemployees();
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
                  <div className="flex position-relative justify-between gap-2 py-5">
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

                    <input
                      name="lastName"
                      type="text"
                      placeholder="Last name"
                      className="input input-bordered w-full"
                      onChange={(e) =>
                        setFieldValue("lastName", e.target.value)
                      }
                      value={values.lastName}
                    />
                    {touched.lastName && errors.lastName && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {/* <span role="alert">{errors.lastName}</span> */}
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
                  <div className="py-5">
                    <select
                      className="select select-bordered w-full mt-5"
                      name="role"
                      onChange={(e) => setFieldValue("role", e.target.value)}
                      value={values.role}
                    >
                      <option disabled value="">
                        Select Role
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
                  <div className="">
                    <input
                      name="Allowance"
                      type="number"
                      placeholder="Allowance"
                      className="input input-bordered w-full mt-5"
                      onChange={(e) =>
                        setFieldValue("Allowance", e.target.value)
                      }
                      value={values.Allowance}
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

export default Employee;
