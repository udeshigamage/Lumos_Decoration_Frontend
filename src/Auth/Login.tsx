import { Form, useNavigate } from "react-router-dom";

import pic07 from "../assets/pico9.jpg";
import { Formik } from "formik";
import { error } from "console";
import { useState } from "react";
import CommonLoading from "../Util/Commonloading";
import axios from "axios";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { LOGIN_ERROR, LOGIN_SUCCESS } from "../reduxstore/Action";
import { login } from "../reduxstore/Userslice";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [isloading, setisloading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Loginvalidationschema = Yup.object({
    Username: Yup.string().required("Username is required"),
    Password: Yup.string().required("Password is required"),
  });
  return (
    <div>
      <div className="flex flex-row">
        <div className="basis-1/2 ">
          <img
            src={pic07}
            className="h-full w-full object-cover h-screen animate-pulse"
          />
        </div>
        <div className="basis-1/2 flex justify-center items-center bg-white ">
          <div className="flex flex-col items-center">
            <div className="flex flex-row position-relative gap-2">
              <a href="/" className="mt-3">
                <span className="text-6xl text-black animate-pulse ">«</span>
              </a>
              <h1 className="mt-4 text-6xl font-serif text-black font-bold mb-4">
                <span className="text-red-950">L</span>ogin
              </h1>
            </div>
            <Formik
              initialValues={{
                Username: "",
                Password: "",
              }}
              validationSchema={Loginvalidationschema}
              onSubmit={async (values, { resetForm }) => {
                setisloading(true);

                const logindetails = {
                  Email: values.Username,
                  PasswordHash: values.Password,
                };

                try {
                  const response = await axios.post(
                    `${API_URL}/Auth/login`,
                    logindetails
                  );
                  localStorage.setItem("token", response.data.token);
                  console.log(response.data.token);
                  console.log(response.data.data.Result[0].Role);
                  dispatch(login(response.data.data.Result[0]));

                  if (response.data.data.Result[0].Role === "Admin") {
                    navigate("/app");
                  }
                  if (response.data.data.Result[0].Role === "Customer") {
                    navigate("/customer/service");
                  }
                  toast.success("Login successfully");
                } catch (error) {
                  toast.error("error");
                  dispatch(LOGIN_ERROR());
                } finally {
                  setTimeout(() => {
                    setisloading(false);
                  }, 1000);
                  resetForm();
                }
              }}
            >
              {({ getFieldProps, errors, touched, values, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                    <div className="px-5 py-5 w-full">
                      <input
                        type="text"
                        placeholder="Username"
                        className="input input-bordered w-full min-w-96"
                        id="Username"
                        {...getFieldProps("Username")}
                      />
                      {errors.Username && touched.Username && (
                        <p className="text-red-600">{errors.Username}</p>
                      )}
                    </div>
                    <div className="px-5 py-5 w-full">
                      <input
                        type="password"
                        placeholder="Password"
                        className="input input-bordered w-full min-w-96"
                        id="Password"
                        {...getFieldProps("Password")}
                      />
                      {errors.Password && touched.Password && (
                        <p className="text-red-600">{errors.Password}</p>
                      )}
                    </div>
                    <div className="flex flex-row justify-center">
                      <div className="px-5 py-5">
                        <button className="btn btn-wide" type="submit">
                          Login
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>

            <div>
              <p className="text-gray-500">
                Don&apos;t have an account?{" "}
                <a
                  href="/signup"
                  className="text-main font-medium text-slate-950 hover:text-red-700 underline"
                >
                  Sign Up
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

export default Login;
