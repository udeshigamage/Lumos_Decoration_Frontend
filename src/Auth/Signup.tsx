import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

import pic07 from "../assets/pico9.jpg";
import { Formik } from "formik";
import CommonLoading from "../Util/Commonloading";
import Customer from "../Dashboard/Customer";
import * as Yup from "yup";

import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;
const Signup = () => {
  const navigate = useNavigate();
  const [isloading, setisloading] = useState(false);
  const customervalidationschema = Yup.object().shape({
    First_name: Yup.string().required("First Name is required"),
    Last_name: Yup.string().required("Last Name is required"),
    Customer_address: Yup.string().required("Address is required"),
    Customer_contact_no: Yup.string()
      .required("Contact Number is required")
      .matches(/^[0-9]{10}$/, "Invalid Contact Number"),
    Customer_email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    Password: Yup.string().required("Password is required"),
    Confirm_password: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("Password")], "Passwords must match"),
  });
  return (
    <div>
      <div className="flex flex-row">
        <div className="basis-1/2 ">
          {" "}
          <img
            src={pic07}
            className="h-full w-full object-cover h-screen animate-pulse"
          />
        </div>
        <div className="basis-1/2 flex justify-center items-center bg-white ">
          <div className="flex flex-col items-center">
            <div className="flex flex-row gap-2 position-relative">
              <a href="/" className="mt-2">
                <span className="text-6xl text-black ">«</span>
              </a>
              <h1 className=" mt-4 text-6xl font-serif text-black font-bold mb-4">
                <span className="text-red-950">S</span>ign{" "}
                <span className="text-red-950">U</span>p
              </h1>
            </div>
            <h1 className="text-black text-2xl font-bold">
              Create your Profile
            </h1>
            <Formik
              initialValues={{
                First_name: "",
                Last_name: "",
                Customer_address: "",
                Customer_contact_no: "",
                Customer_email: "",
                Password: "",
                Confirm_password: "",
              }}
              validationSchema={customervalidationschema}
              onSubmit={async (values, { resetForm }) => {
                setisloading(true);

                console.log(values);
                const customers = {
                  Customer_name: values.First_name + " " + values.Last_name,
                  Customer_address: values.Customer_address,
                  Customer_contact_no: values.Customer_contact_no,
                  Customer_email: values.Customer_email,
                  Password: values.Password,
                };
                console.log(customers);
                try {
                  await axios.post(`${API_URL}/Customer`, customers);
                  toast.success("Customer Created Successfully");
                  resetForm();
                } catch (error) {
                  toast.error("Error Creating Customer");
                } finally {
                  setTimeout(() => {
                    setisloading(false);
                  }, 1000);
                  resetForm();
                }
              }}
            >
              {({ getFieldProps, errors, values, touched, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2 ">
                    <div className="flex flex-row position-relative">
                      <div className="px-5 py-5 w-full">
                        <input
                          type="text"
                          placeholder="First name"
                          id="First_name"
                          {...getFieldProps("First_name")}
                          className="input input-bordered w-full min-w-96"
                        />
                        {errors.First_name && touched.First_name && (
                          <p className="text-red-500">{errors.First_name}</p>
                        )}
                      </div>
                      <div className="px-5 py-5 w-full">
                        <input
                          id="Last_name"
                          type="text"
                          placeholder="Last name"
                          {...getFieldProps("Last_name")}
                          className="input input-bordered w-full min-w-96"
                        />
                        {errors.Last_name && touched.Last_name && (
                          <p className="text-red-500">{errors.Last_name}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-row position-relative">
                      <div className="px-5 py-5 w-full">
                        <input
                          id="Password"
                          type="password"
                          placeholder="Password"
                          {...getFieldProps("Password")}
                          className="input input-bordered w-full min-w-96"
                        />
                        {errors.Password && touched.Password && (
                          <p className="text-red-500">{errors.Password}</p>
                        )}
                      </div>
                      <div className="px-5 py-5 w-full">
                        <input
                          id="Confirm_password"
                          type="password"
                          placeholder="Confirm password"
                          {...getFieldProps("Confirm_password")}
                          className="input input-bordered w-full min-w-96"
                        />
                        {errors.Confirm_password &&
                          touched.Confirm_password && (
                            <p className="text-red-500">
                              {errors.Confirm_password}
                            </p>
                          )}
                      </div>
                    </div>
                    <div className="flex flex-row position-relative">
                      <div className="px-5 py-5 w-full">
                        <input
                          id="Customer_email"
                          type="email"
                          placeholder="Email"
                          {...getFieldProps("Customer_email")}
                          className="input input-bordered w-full min-w-96"
                        />
                        {errors.Customer_email && touched.Customer_email && (
                          <p className="text-red-500">
                            {errors.Customer_email}
                          </p>
                        )}
                      </div>
                      <div className="px-5 py-5 w-full">
                        <input
                          id="Customer_contact_no"
                          type="tel"
                          placeholder="Contact_no(07xxxxxxxx)"
                          {...getFieldProps("Customer_contact_no")}
                          className="input input-bordered w-full min-w-96"
                        />
                        {errors.Customer_contact_no &&
                          touched.Customer_contact_no && (
                            <p className="text-red-500">
                              {errors.Customer_contact_no}
                            </p>
                          )}
                      </div>
                    </div>
                    <div className="flex flex-row position-relative">
                      <div className="px-5 py-5 w-full ">
                        <textarea
                          id="Customer_address"
                          rows={5}
                          cols={20}
                          placeholder="Address"
                          {...getFieldProps("Customer_address")}
                          className="input input-bordered w-full h-[100px] min-w-96 p-5"
                        />
                        {errors.Customer_address &&
                          touched.Customer_address && (
                            <p className="text-red-500">
                              {errors.Customer_address}
                            </p>
                          )}
                      </div>
                    </div>
                    <div className="flex flex-row justify-center items-center">
                      <div className="px-5 py-5">
                        <button className="btn btn-wide" type="submit">
                          Signup
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>

            <div>
              <p className="text-gray-500">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-main font-medium text-slate-950 hover:text-red-700 underline"
                >
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      {isloading && <CommonLoading />}
    </div>
  );
};

export default Signup;
