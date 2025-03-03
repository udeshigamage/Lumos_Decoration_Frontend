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

const API_URL = import.meta.env.VITE_API_URL;
const Employee = () => {
  const [Employee, setEmployee] = useState([]);
  const [ismodelopen, setmodelopen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, settotalitems] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const [isloading, setisloading] = useState(false);
  const [RoleList, setRoleList] = useState([]);

  const pageSize = 5;

  const EmployeeSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    contactno: Yup.string().matches(
      /^\+?[1-9]\d{1,14}$/,
      "Contact number must be valid"
    ),

    Allowance: Yup.number().required("Allowance is required"),
  });

  const fetchemployees = async (page: number) => {
    console.log(API_URL);
    setisloading(true);
    try {
      let response = await axios.get(
        `${API_URL}/Employee?page=${page}&pageSize=${pageSize}`
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
    value: item.Roll_ID,
    label: item.Roll_Name,
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
    try {
      await axios.delete(`${API_URL}/Employee/${id}`);
    } catch (error) {
      console.log(error);
    }
    fetchemployees(currentPage);
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
                          <a className="text-black text-hover-primary fs-6 ">
                            {item?.emp_image ? (
                              <img
                                src={item.emp_image}
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
                          <a className="text-black text-hover-primary fs-6">
                            {item?.emp_Name ?? "-"}
                          </a>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-start flex-column">
                          <a className="text-black text-hover-primary ">
                            {item?.emp_contact_no ?? "-"}
                          </a>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-start flex-column">
                          <a className="text-black text-hover-primary fs-6 ">
                            {item?.Roll_Name ?? "-"}
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
                              className="bg-black text-white px-2 py-2  rounded-md"
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
                              className="bg-black  text-white px-2 py-2  rounded-md"
                              onClick={() => {
                                handledelete(item?.Emp_ID);
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
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div
            className="  text-black p-5 rounded-lg text-blacl w-[900px] h-[500px]"
            style={{
              backgroundImage: `url(${pico23})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h3 className="font-bold text-2xl font-serif font-bold">
              {selectedEmployee?.Emp_ID ? "Edit" : "Add"} Employee
            </h3>
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
                Role_ID: selectedEmployee?.Role_ID || "",
                Allowance: selectedEmployee?.emp_allowance || "",
                NIC: selectedEmployee?.nic || "",
                emp_image: selectedEmployee?.emp_image || "",
              }}
              validationSchema={EmployeeSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                setSubmitting(true);

                try {
                  if (selectedEmployee) {
                    // If editing, send PUT request
                    await axios.put(
                      `${API_URL}/Employee/${selectedEmployee.Emp_ID}`,
                      {
                        emp_Name: `${values.firstName} ${values.lastName}`,
                        emp_address: values.Address,
                        email: values.email,
                        Roll_ID: values.Role_ID,
                        emp_contact_no: values.contactno,
                        emp_allowance: values.Allowance,
                        emp_image: values.emp_image,
                        nic: values.NIC,
                      }
                    );
                  } else {
                    // If adding a new employee, send POST request
                    await axios.post(`${API_URL}/Employee`, {
                      emp_Name: `${values.firstName} ${values.lastName}`,
                      emp_address: values.Address,
                      email: values.email,
                      Role_ID: values.Role_ID,
                      emp_contact_no: values.contactno,
                      emp_allowance: values.Allowance,
                      nic: values.NIC,
                      emp_image: image || values.emp_image,
                    });
                  }
                  resetForm();
                  setmodelopen(false);
                  fetchemployees(currentPage);
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
                  <div className="flex flex-row gap-2">
                    <div className="basis-1/3">
                      <div className="flex flex-col  mt-5 justify-center items-center">
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
                          ) : selectedEmployee?.emp_image ? (
                            <img
                              src={selectedEmployee.emp_image}
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
                    <div className="basis-2/3">
                      {" "}
                      <div className="flex flex-row   gap-2  ">
                        <div className="basis-1/2">
                          <input
                            type="text"
                            placeholder="First name"
                            className="input input-bordered text-white w-full"
                            onChange={(e) =>
                              setFieldValue("firstName", e.target.value)
                            }
                            value={values.firstName}
                          />
                        </div>
                        <div className="basis-1/2">
                          <input
                            name="lastName"
                            type="text"
                            placeholder="Last name"
                            className="input input-bordered text-white w-full"
                            onChange={(e) =>
                              setFieldValue("lastName", e.target.value)
                            }
                            value={values.lastName}
                          />
                        </div>
                      </div>
                      <div className="flex flex-row my-3 ">
                        <Select
                          options={options}
                          className="rounded-lg"
                          value={options.find(
                            (option) => option.value === values.Role_ID
                          )}
                          onChange={(option) =>
                            setFieldValue("Role_ID", option?.value)
                          }
                          styles={{
                            control: (baseStyles) => ({
                              ...baseStyles,
                              backgroundColor: "black",
                              color: "white",
                              borderColor: "gray",
                              width: "280px",
                              height: "50px",
                            }),
                            singleValue: (base) => ({
                              ...base,
                              color: "white",
                            }),
                            menu: (base) => ({
                              ...base,
                              backgroundColor: "black",
                            }),
                            option: (base, state) => ({
                              ...base,
                              backgroundColor: state.isSelected
                                ? "gray"
                                : "black",
                              color: "white",
                              ":hover": {
                                backgroundColor: "gray",
                              },
                            }),
                            placeholder: (base) => ({
                              ...base,
                              color: "white",
                            }),
                            input: (base) => ({
                              ...base,
                              color: "white",
                            }),
                          }}
                        />
                      </div>
                      <div className="flex flex-row gap-2 mb-3">
                        <div className="basis-1/2">
                          <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            className="input input-bordered text-white w-full "
                            onChange={(e) =>
                              setFieldValue("email", e.target.value)
                            }
                            value={values.email}
                          />
                        </div>
                        <div className="basis-1/2">
                          <input
                            name="contactno"
                            type="text"
                            placeholder="Contact Number (+94760305481)"
                            className="input input-bordered text-white w-full "
                            onChange={(e) =>
                              setFieldValue("contactno", e.target.value)
                            }
                            value={values.contactno}
                          />
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <textarea
                          name="address"
                          placeholder="Address"
                          className="textarea textarea-bordered text-white w-full "
                          onChange={(e) =>
                            setFieldValue("Address", e.target.value)
                          }
                          value={values.Address}
                        />
                      </div>
                      <div className="flex flex-row gap-2 mt-3">
                        <div className="basis-1/2">
                          <input
                            name="Allowance"
                            type="number"
                            placeholder="Allowance"
                            className="input input-bordered text-white w-full "
                            onChange={(e) =>
                              setFieldValue("Allowance", e.target.value)
                            }
                            value={values.Allowance}
                          />
                        </div>
                        <div className="basis-1/2">
                          <input
                            name="NIC"
                            type="text"
                            placeholder="NIC"
                            className="input input-bordered text-white w-full "
                            onChange={(e) =>
                              setFieldValue("NIC", e.target.value)
                            }
                            value={values.NIC}
                          />
                        </div>
                      </div>
                      <div className="flex positon-relative gap-5 mt-10 justify-end">
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
                  </div>

                  {/* <pre>Values: {JSON.stringify(values, null, 2)}</pre>
                  <pre>Errors: {JSON.stringify(errors, null, 2)}</pre>
                  <pre>Is Submitting: {JSON.stringify(isSubmitting)}</pre> */}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
      {isloading && <CommonLoading />}
    </div>
  );
};

export default Employee;
