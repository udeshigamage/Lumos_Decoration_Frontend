import React, { useEffect, useState } from "react";

import CommonLoading from "../../Util/Commonloading";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";
import pic045 from "../../assets/pic56.jpg";
import pico23 from "../../assets/pico36.jpg";
import { FaPlus } from "react-icons/fa";
import Select from "react-select";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import Deleteconfirmation from "../../Util/Deleteconfirmation";
import { Form } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const Subcategory = () => {
  const [isloading, setisloading] = useState(false);
  const [Categories, setcategories] = useState<any>([]);
  const [totalItems, settotalitems] = useState(0);
  const [totalpages, settotalpages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [ismodelopen, setmodelopen] = useState(false);
  const [CategoryList, setCategoryList] = useState([]);
  const [selectedsubcategory, setSelectedsubcategory] = useState<any>(null);
  const [categotyid, setsubcategoryid] = useState("");
  const [isconfirmationopen, setisconfirmationopen] = useState(false);
  const pageSize = 5;
  const subcategorySchema = Yup.object().shape({
    Subcategory_name: Yup.string().required("subcategory name is required"),
    Subcategory_description: Yup.string().required("Description is required"),
  });
  const [image, setImage] = useState<string | null>(null);

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
  const fetchcategories = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/Category/category/categorylist`
      );

      console.log(response);
      setCategoryList(response?.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchcategories();
  }, []);
  const options = CategoryList?.map((item: any) => ({
    value: item.Category_Id,
    label: item.Category_name,
  }));
  const fetchsubcategories = async (page: number) => {
    setisloading(true);
    try {
      const categories = await axios.get(
        `${API_URL}/Subcategory?page=${page}&pagesize=${pageSize}`
      );
      setcategories(categories.data.data);
      settotalitems(categories.data.totalItems);
      settotalpages(categories.data.totalPages);
      setCurrentPage(categories.data.currentPage);
      setisloading(false);
      toast.success("subcategory Fetched Successfully");
    } catch (error) {
      toast.error("Error Fetching subcategory");
    } finally {
      setisloading(false);
    }
  };

  useEffect(() => {
    fetchsubcategories(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalpages) {
      setCurrentPage(page);
    }
  };
  const handledelete = async (item: any) => {
    setisconfirmationopen(true);
    setsubcategoryid(item);
  };

  const handleclose = async () => {
    setisconfirmationopen(false);
  };
  const subcategorydelete = async () => {
    setisloading(true);
    try {
      await axios.delete(`${API_URL}/Subcategory/${categotyid}`);

      toast.success("deleted succcessfully");
      await fetchsubcategories(currentPage);
    } catch (error) {
      toast.error("error");
    } finally {
      setTimeout(() => {
        setisloading(false);
      }, 1000);
      setisconfirmationopen(false);
    }
  };
  const resetFormAndClose = (resetForm: any) => {
    resetForm();
    setImage(null);
    setSelectedsubcategory(null);
    setmodelopen(false);
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl text-black m-5 font-bold rounded-md">
          Subcategory Management
        </h1>
        <FaPlus
          color="black"
          size={40}
          className="mt-2 bg-white p-1 rounded-full"
          onClick={() => setmodelopen(true)}
        />
      </div>

      <table
        className="table border-white  opacity-90 text-black"
        style={{
          backgroundImage: `url(${pic045})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <thead className="text-black text-xl">
          <tr>
            <th>Image </th>
            <th>Category Name</th>
            <th>Subcategory Name</th>
            <th>Description </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Categories?.length > 0 ? (
            Categories?.map((item: any, index: any) => (
              <tr key={item?.Subcategory_Id}>
                <td>
                  <div className="d-flex justify-content-start flex-column">
                    <a className="text-black text-hover-primary fs-6 ">
                      {item?.Subcategory_image ? (
                        <img
                          src={item?.Subcategory_image}
                          alt="Category"
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
                    <a className="text-black text-lg font-semibold text-hover-primary fs-6">
                      {item?.Category?.Category_name ?? "-"}
                    </a>
                  </div>
                </td>
                <td>
                  <div className="d-flex justify-content-start flex-column">
                    <a className="text-black text-lg font-semibold text-hover-primary fs-6">
                      {item?.Subcategory_name ?? "-"}
                    </a>
                  </div>
                </td>

                <td>
                  <div className="d-flex justify-content-start flex-column">
                    <a className="text-black text-lg font-semibold  text-hover-primary fs-6">
                      {item?.Subcategory_description ?? "-"}
                    </a>
                  </div>
                </td>

                <td>
                  <div className="flex position-relative">
                    <div className="px-5">
                      <button
                        className="bg-black text-white px-2 py-2  rounded-md"
                        onClick={() => {
                          setSelectedsubcategory(item);
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
                          handledelete(item?.Subcategory_Id);
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
              <td colSpan={4}>
                <div className="py-5 d-flex flex-column align-content-center justify-content-center">
                  <div className="d-flex text-center w-100 align-content-center justify-content-center fw-semibold fs-3 text-black mt-5">
                    No matching records found
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex flex-col items-end text-[#183642]  text-lg font-semibold font-mono">
        <div className="pagination ">
          <button
            className="btn m-2 bg-white text-[#183642] rounded-full p-2"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <TbPlayerTrackPrevFilled />
          </button>
          <span className="text-[#183642]  rounded-lg p-1">
            Page {currentPage} of {totalpages}: {totalItems}
          </span>
          <button
            className="btn mt-5 ml-5 bg-white text-[#183642] rounded-full p-2 "
            disabled={currentPage === totalpages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <TbPlayerTrackNextFilled />
          </button>
        </div>
      </div>
      {ismodelopen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div
            className="w-[700px] h-[500px] bg-red-200 rounded-lg  shadow-2xl shadow-zinc-500"
            style={{
              backgroundImage: `url(${pico23})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "500px",
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
              <div className="flex flex-row justify-center items-center m-2 ">
                <h1 className="text-slate-900 text-3xl font-bold font-serif ">
                  {selectedsubcategory?.subcategory_Id ? "Edit" : "Add"}{" "}
                  subcategory
                </h1>
              </div>
              <Formik
                initialValues={{
                  Category_Id: selectedsubcategory?.Category_Id || "",
                  Subcategory_Id: selectedsubcategory?.Subcategory_Id || "",
                  Subcategory_name: selectedsubcategory?.Subcategory_name || "",
                  Subcategory_description:
                    selectedsubcategory?.Subcategory_description || "",
                  Subcategory_image:
                    selectedsubcategory?.Subcategory_image || "",
                }}
                onSubmit={async (values, { resetForm }) => {
                  console.log("clicked", values);
                  setisloading(true);
                  try {
                    const categoryData = {
                      Category_Id: values.Category_Id,
                      Subcategory_name: values.Subcategory_name,
                      Subcategory_description: values.Subcategory_description,
                      Subcategory_image: image || values.Subcategory_image, // Use the base64 string directly
                    };

                    if (selectedsubcategory?.Subcategory_Id) {
                      await axios.put(
                        `${API_URL}/subcategory/${selectedsubcategory?.Subcategory_Id}`,
                        categoryData
                      );
                      toast.success("Updated successfully");
                    } else {
                      await axios.post(`${API_URL}/subcategory`, categoryData);
                      toast.success("Added successfully");
                    }

                    fetchsubcategories(currentPage);
                    resetFormAndClose(resetForm);
                  } catch (error) {
                    console.error("Error submitting form:", error);
                    toast.error("Error saving category");
                  } finally {
                    setisloading(false);
                  }
                }}
                validationSchema={subcategorySchema}
              >
                {({
                  values,
                  getFieldProps,

                  handleSubmit,
                  setFieldValue,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="flex flex-row m-5 gap-2">
                      <div className="basis-1/2 ">
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
                            ) : selectedsubcategory?.Subcategory_image ? (
                              <img
                                src={selectedsubcategory?.Subcategory_image}
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
                      <div className="basis-1/2 flex flex-col  ">
                        <label className="text-black"> Category</label>
                        <Select
                          options={options}
                          value={options.find(
                            (option) => option.value === values.Category_Id
                          )} // Ensure the correct value is selected
                          onChange={(option) =>
                            setFieldValue("Category_Id", option?.value)
                          } // Pass only the value
                          styles={{
                            control: (baseStyles) => ({
                              ...baseStyles,
                              backgroundColor: "black",
                              color: "white",
                              width: "300px",
                              borderColor: "gray",
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
                          }}
                        />

                        <div>
                          <label className="text-black mr-2 ">
                            subcategory Name
                          </label>
                        </div>
                        <div>
                          <input
                            type="text"
                            className="w-[300px] h-[40px]  p-2 mt-2"
                            {...getFieldProps("Subcategory_name")}
                          />
                        </div>
                        <div>
                          <label className="text-black mb-4">
                            subcategory Description
                          </label>
                          <textarea
                            rows={3}
                            cols={50}
                            className=" p-2 mt-2"
                            {...getFieldProps("Subcategory_description")}
                          />
                        </div>
                        <div className=" flex flex-row position-relative justify-end gap-2 m-2">
                          <button
                            className="text-white bg-black px-3 py-2 rounded-xl"
                            type="submit"
                          >
                            Submit
                          </button>
                          <button
                            className="text-white bg-black px-3  py-2 rounded-xl w-[75px]"
                            onClick={() => {
                              setmodelopen(false);
                            }}
                          >
                            {" "}
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
        </div>
      )}
      {isconfirmationopen && (
        <Deleteconfirmation
          handledelete={subcategorydelete}
          setmodelclose={handleclose}
        />
      )}
      {isloading && <CommonLoading />}
    </div>
  );
};

export default Subcategory;
