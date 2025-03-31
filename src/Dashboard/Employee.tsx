import axios from "axios";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import pico23 from "../assets/pico36.jpg";
import Select from "react-select";
import pic045 from "../assets/pic56.jpg";

import * as Yup from "yup";
import CommonLoading from "../Util/Commonloading";
import { toast } from "react-toastify";
import { IoMdCloseCircle } from "react-icons/io";

const API_URL = import.meta.env.VITE_API_URL;
const Employee = () => {
  const [Employee, setEmployee] = useState([]);
  const [ismodelopen, setmodelopen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, settotalitems] = useState(0);

  const [isloading, setisloading] = useState(false);
  const [RoleList, setRoleList] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [image, setImage] = useState<string | null>(null);

  const pageSize = 5;

  const fetchemployees = async (page: number) => {
    console.log(API_URL);
    setisloading(true);
    try {
      let response = await axios.get(
        `${API_URL}/Employee?page=${page}&pageSize=${pageSize}&searchterm=${searchTerm}`
      );

      setEmployee(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      settotalitems(response.data.totalItems);
      toast.success("fetched successfully");
    } catch (error) {
      console.log(error);
      toast.error("error");
    } finally {
      setTimeout(() => {
        setisloading(false);
      }, 1000);
    }
  };
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
    NIC: Yup.string().required("NIC is required"),
  });
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      fetchemployees(currentPage);
      // You can add your search logic here
    }
  };
  const fetchroles = async () => {
    try {
      const response = await axios.get(`${API_URL}/Role/Rolelist`);

      console.log(response);
      setRoleList(response?.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchroles();
  }, []);
  const options = RoleList?.map((item: any) => ({
    value: item.Role_ID,
    label: item.Role_Name,
  }));
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    fetchemployees(currentPage);
  }, [currentPage]);
  const handledelete = async (id: any) => {
    setisloading(true);
    try {
      await axios.put(`${API_URL}/Employee/Deactivate/${id}`);
      toast.success("deactivated successfully");
      await fetchemployees(currentPage);
    } catch (error) {
      console.log(error);
      toast.error("error");
    } finally {
      setTimeout(() => {
        setisloading(false);
      }, 1000);
    }
  };
  const handleactivate = async (id: any) => {
    setisloading(true);
    try {
      await axios.put(`${API_URL}/Employee/Activateuser/${id}`);
      toast.success("activated successfully");
      await fetchemployees(currentPage);
    } catch (error) {
      console.log(error);
      toast.error("error");
    } finally {
      setTimeout(() => {
        setisloading(false);
      }, 1000);
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="px-5 py-5 rounded-lg ">
        {" "}
        <div className="flex flex-row items-center justify-between w-full">
          <div className="">
            <h1 className="text-4xl text-black font-bold font-serif">
              Employee
            </h1>
          </div>
          <div className="flex items-center gap-4 px-5">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-full p-2 border rounded-lg pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
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
                  <th>Image</th>
                  <th>Name</th>
                  <th>Contact number</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Employee?.length > 0 ? (
                  Employee?.map((item: any, index: any) => (
                    <tr>
                      <td>
                        <div className="d-flex justify-content-start flex-column">
                          <a className="text-black text-hover-primary fs-6 ">
                            {item?.userimage ? (
                              <img
                                src={item.userimage}
                                alt="Employee"
                                className="w-16 h-16 object-cover rounded-full"
                              />
                            ) : (
                              "-"
                            )}
                          </a>
                        </div>
                      </td>

                      <td>
                        <div className="d-flex justify-content-start flex-column">
                          <a className="text-black font-semibold text-lg text-hover-primary fs-6">
                            {item?.Name ?? "-"}
                          </a>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-start flex-column">
                          <a className="text-black font-semibold text-lg text-hover-primary ">
                            {item?.Contact_no ?? "-"}
                          </a>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-start flex-column">
                          <a className="text-black font-semibold text-lg text-hover-primary fs-6 ">
                            {item?.Servicerole ?? "-"}
                          </a>
                        </div>
                      </td>
                      <td>
                        <a className=" text-hover-primary font-semibold text-lg fs-6 px-5 py-5 rounded-md ">
                          {item?.Email ?? "-"}
                        </a>
                      </td>
                      <td>
                        <a className=" text-hover-primary font-semibold text-lg fs-6 px-5 py-5 rounded-md ">
                          <span
                            className={`px-3 py-2 text-white text-sm font-semibold rounded-lg ${
                              item?.isactive ? "bg-green-600" : "bg-red-700"
                            }`}
                          >
                            {item?.isactive ? "Active" : "Inactive"}
                          </span>
                        </a>
                      </td>
                      <td>
                        <div className="flex position-relative">
                          <div className="px-5">
                            <button
                              className="bg-black text-white px-2 py-2  rounded-md"
                              onClick={() => {
                                setSelectedEmployee(item);
                                setmodelopen(true);
                              }}
                            >
                              Edit
                            </button>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button
                              className="bg-black  text-white px-2 py-2  rounded-md"
                              onClick={() => {
                                handledelete(item?.User_ID);
                              }}
                            >
                              Deactivate
                            </button>
                            <button
                              className="bg-black  text-white px-2 py-2  rounded-md"
                              onClick={() => {
                                handleactivate(item?.User_ID);
                              }}
                            >
                              Activate
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
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div
            className="  text-black p-5 rounded-lg text-blacl w-[1500px] h-[800px]"
            style={{
              backgroundImage: `url(${pico23})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex flex-col">
              <div className="flex flex-row justify-end items-center ">
                <IoMdCloseCircle
                  size={30}
                  color="black"
                  className="m-2"
                  onClick={() => {
                    setmodelopen(false);
                  }}
                />
              </div>
              <h3 className="font-bold text-2xl font-serif font-bold">
                {selectedEmployee?.User_ID ? "Edit" : "Add"} Employee
              </h3>
              <Formik
                initialValues={{
                  First_name: selectedEmployee?.Name?.split(" ")[0] || "",
                  Last_name: selectedEmployee?.Name?.split(" ")[1] || "",
                  Customer_address: selectedEmployee?.Address ?? "",
                  Customer_contact_no: selectedEmployee?.Contact_no || "",
                  Customer_email: selectedEmployee?.Email || "",
                  Password: "",
                  Confirm_password: "",
                  Role: selectedEmployee?.RoleName || "Employee",
                  Servicerole: selectedEmployee?.Servicerole || "",
                  NIC: selectedEmployee?.NIC || "",
                  userimage: selectedEmployee?.userimage || "",
                }}
                validationSchema={customervalidationschema}
                onSubmit={async (values, { resetForm }) => {
                  setisloading(true);

                  console.log(values);
                  const Employee = {
                    Name: values.First_name + " " + values.Last_name,
                    Address: values.Customer_address,
                    Contact_no: values.Customer_contact_no,
                    Email: values.Customer_email,
                    PasswordHash: values.Password,
                    Role: "Employee",
                    RoleName: "Employee",
                    NIC: values.NIC,
                    Servicerole: values.Servicerole,
                    userimage: image || values.userimage,
                  };

                  try {
                    if (selectedEmployee?.User_ID) {
                      const message = await axios.put(
                        `${API_URL}/Employee/${selectedEmployee?.User_ID}`,
                        Employee
                      );
                      toast.success(
                        message?.data?.Text ?? "User Updated successfully!"
                      );
                    } else {
                      const message = await axios.post(
                        `${API_URL}/User`,
                        Employee
                      );
                      toast.success(
                        message?.data?.Text ?? "User created successfully!"
                      );
                    }

                    resetForm();
                  } catch (error) {
                    toast.error("Error Creating Employee");
                  } finally {
                    setTimeout(() => {
                      setisloading(false);
                    }, 1000);
                    resetForm();
                    setmodelopen(false);
                    setImage(null);
                    await fetchemployees(currentPage);
                  }
                }}
              >
                {({
                  getFieldProps,
                  errors,
                  values,
                  touched,
                  handleSubmit,
                  setFieldValue,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 ">
                      <div className="flex flex-row position-relative">
                        <div className="w-1/3">
                          {" "}
                          <div className="flex flex-col items-center space-y-4">
                            <label
                              htmlFor="file-upload"
                              className="relative w-48 h-48 rounded-full border-2 border-black flex items-center justify-center cursor-pointer overflow-hidden"
                            >
                              {image ? (
                                <img
                                  src={image}
                                  alt="Uploaded"
                                  className="w-full h-full object-cover rounded-full"
                                />
                              ) : selectedEmployee?.userimage ? (
                                <img
                                  src={selectedEmployee.userimage}
                                  alt="Current"
                                  className="w-full h-full object-cover rounded-full"
                                />
                              ) : (
                                <span className="text-black">Upload Image</span>
                              )}
                            </label>

                            <input
                              id="file-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="hidden"
                            />
                          </div>
                        </div>
                        <div className="w-2/3  ">
                          <div className="flex flex-col">
                            <div className="px-5 py-5 w-full">
                              <input
                                type="text"
                                placeholder="First name"
                                id="First_name"
                                {...getFieldProps("First_name")}
                                className="input input-bordered w-full min-w-96 text-white"
                              />
                              {errors.First_name && touched.First_name && (
                                <p className="text-red-500">
                                  {typeof errors.First_name === "string"
                                    ? errors.First_name
                                    : JSON.stringify(errors.First_name)}
                                </p>
                              )}
                            </div>
                            <div className="px-5 py-5 w-full">
                              <input
                                id="Last_name"
                                type="text"
                                placeholder="Last name"
                                {...getFieldProps("Last_name")}
                                className="input input-bordered w-full min-w-96 text-white"
                              />
                              {errors.Last_name && touched.Last_name && (
                                <p className="text-red-500">
                                  {typeof errors.Last_name === "string"
                                    ? errors.Last_name
                                    : JSON.stringify(errors.Last_name)}
                                </p>
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
                                className="input input-bordered w-full min-w-96 text-white"
                              />
                              {errors.Password && touched.Password && (
                                <p className="text-red-500">
                                  {errors.Password}
                                </p>
                              )}
                            </div>
                            <div className="px-5 py-5 w-full">
                              <input
                                id="Confirm_password"
                                type="password"
                                placeholder="Confirm password"
                                {...getFieldProps("Confirm_password")}
                                className="input input-bordered w-full min-w-96 text-white"
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
                                className="input input-bordered w-full min-w-96 text-white"
                              />
                              {errors.Customer_email &&
                                touched.Customer_email && (
                                  <p className="text-red-500">
                                    {typeof errors.Customer_email === "string"
                                      ? errors.Customer_email
                                      : JSON.stringify(errors.Customer_email)}
                                  </p>
                                )}
                            </div>
                            <div className="px-5 py-5 w-full">
                              <input
                                id="Customer_contact_no"
                                type="text"
                                placeholder="Contact_no(07xxxxxxxx)"
                                {...getFieldProps("Customer_contact_no")}
                                className="input input-bordered w-full min-w-96 text-white"
                              />

                              {errors.Customer_contact_no &&
                                touched.Customer_contact_no && (
                                  <p className="text-red-500">
                                    {typeof errors.Customer_contact_no ===
                                    "string"
                                      ? errors.Customer_contact_no
                                      : JSON.stringify(
                                          errors.Customer_contact_no
                                        )}
                                  </p>
                                )}
                            </div>
                          </div>
                          <div className="flex flex-row position-relative">
                            <div className="px-5 pt-5 w-full">
                              <Select
                                className="input input-bordered min-w-96 text-white"
                                id="Servicerole"
                                name="Servicerole"
                                options={options}
                                value={options.find(
                                  (option) =>
                                    option.label === values.Servicerole
                                )} // Match by label
                                onChange={(option) =>
                                  setFieldValue("Servicerole", option?.label)
                                } // Send label to server
                                placeholder="Select an option"
                                styles={{
                                  control: (provided) => ({
                                    ...provided,
                                    backgroundColor: "black",
                                    color: "white",
                                  }),
                                  singleValue: (provided) => ({
                                    ...provided,
                                    color: "white",
                                  }),
                                  placeholder: (provided) => ({
                                    ...provided,
                                    color: "white",
                                  }),
                                  menu: (provided) => ({
                                    ...provided,
                                    backgroundColor: "black",
                                  }),
                                  option: (provided, state) => ({
                                    ...provided,
                                    backgroundColor: state.isSelected
                                      ? "#333"
                                      : "black",
                                    color: "white",
                                  }),
                                }}
                              />
                            </div>

                            <div className="px-5 py-5 w-full ">
                              <textarea
                                id="Customer_address"
                                rows={5}
                                cols={20}
                                placeholder="Address"
                                {...getFieldProps("Customer_address")}
                                className="input input-bordered w-full h-[100px] min-w-96 p-5 text-white"
                              />
                              {errors.Customer_address &&
                                touched.Customer_address && (
                                  <p className="text-red-500">
                                    {typeof errors.Customer_address === "string"
                                      ? errors.Customer_address
                                      : JSON.stringify(errors.Customer_address)}
                                  </p>
                                )}
                            </div>
                          </div>
                          <div className="flex flex-row">
                            <div className="px-5  w-full ">
                              <input
                                type="text"
                                id="NIC"
                                placeholder="1999*******V"
                                {...getFieldProps("NIC")}
                                className="input input-bordered  min-w-96 text-white"
                              />
                              {errors.NIC && touched.NIC && (
                                <p className="text-red-500">
                                  {typeof errors.NIC === "string"
                                    ? errors.NIC
                                    : JSON.stringify(errors.NIC)}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-row justify-center items-center">
                            <div className="px-5 py-5">
                              <button className="btn btn-wide" type="submit">
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
      {isloading && <CommonLoading />}
    </div>
  );
};

export default Employee;
