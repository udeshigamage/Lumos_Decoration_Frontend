import axios from "axios";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";

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
const Categoryx = () => {
  const [Employee, setEmployee] = useState([]);
  const [ismodelopen, setmodelopen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, settotalitems] = useState(0);
  const [isloading, setisloading] = useState(false);

  const pageSize = 5;

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

  const fetchemployees = async (page: number) => {
    console.log(API_URL);
    try {
      let response = await axios.get(
        `${API_URL}/Employee?page=${page}&pageSize=${pageSize}`
      );

      setEmployee(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      settotalitems(response.data.totalItems);
    } catch (error) {
      console.log(error);
    }
  };

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
  return (
    <div className="flex flex-col">
      <div className="px-5 py-5 rounded-lg ">
        {" "}
        <div className="flex flex-row items-center justify-between w-full">
          <div className="">
            <h1 className="text-4xl text-black font-bold font-serif">
              Category
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
              Add Category
            </button>
          </div>
        </div>
      </div>
      <div>
        <div style={{ minHeight: "calc(100vh - 320px)" }}>
          <div className="overflow-x-auto">
            <table className="table border-white bg-red-100 opacity-90 text-black">
              {/* head */}
              <thead className="text-black text-xl">
                <tr>
                  <th>Image </th>
                  <th> Category Name</th>
                  <th>Description </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Employee?.length > 0 ? (
                  Employee?.map((item: any, index: any) => (
                    <tr>
                      <td>
                        <div className="d-flex justify-content-start flex-column">
                          <a className="text-black text-hover-primary fs-6">
                            {item?.emp_ID ?? "-"}
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
        <div className="fixed inset-0 z-50 flex justify-center items-center ">
          <div className="w-[700px] h-[400px] bg-slate-400 bg-opacity-50 text-black rounded-xl">
            <div className="flex flex-row justify-end">
              <button className="bg-black text-white p-2 rounded-lg font-bold m-3">
                {"X"}
              </button>
            </div>
            <div className="flex flex-row justify-center items-center">
              <h3 className="font-bold text-xl mb-5">Add Category</h3>
            </div>

            <Formik
              initialValues={{
                item_category_image: "",
                item_category_name: "",
                item_category_description: "",
              }}
              onSubmit={async (values: any, { resetForm }) => {
                setisloading(true);
                try {
                  await axios.post(`${API_URL}/Category`, values);
                  // fetchcategories(currentPage);
                  toast.success("successfully inserted");
                  setmodelopen(false);
                  resetForm;
                } catch (error) {
                  toast.error("error");
                } finally {
                  setTimeout(() => {
                    setisloading(false);
                  }, 1000);
                }
              }}
            >
              {({
                values,
                handleSubmit,
                resetForm,

                getFieldProps,
              }) => (
                <Form>
                  <div className="flex flex-row ">
                    <div className="basis-1/3 p-2">
                      <label>Upload image</label>
                      <input type="file" className="rounded-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                      <label>Category name</label>
                      <input
                        type="text"
                        className="w-[300px] h-[40px] rounded-lg text-white p-2"
                        {...getFieldProps("item_category_name")}
                      />
                      <label>Description</label>
                      <input
                        type="text"
                        className="w-[300px] h-[40px] rounded-lg text-white p-2"
                        {...getFieldProps("item_category_description")}
                      />
                      <div className="flex flex-row position-relative justify-end gap-5 m-5">
                        <button
                          type="submit"
                          onClick={() => handleSubmit}
                          className="bg-black text-white p-2  w-[90px] rounded-lg"
                        >
                          submit
                        </button>
                        <button className="bg-black text-white p-2 w-[90px] rounded-lg">
                          close
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categoryx;
