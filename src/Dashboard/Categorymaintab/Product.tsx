import React, { useEffect, useState } from "react";
import Loader from "../../Util/Loader";
import CommonLoading from "../../Util/Commonloading";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import pic045 from "../../assets/pic56.jpg";
import pico23 from "../../assets/pico36.jpg";
import { FaPlus } from "react-icons/fa";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import Deleteconfirmation from "../../Util/Deleteconfirmation";
import Select from "react-select";

const API_URL = import.meta.env.VITE_API_URL;
const Product = () => {
  const [isloading, setisloading] = useState(false);
  const [Categories, setcategories] = useState<any>([]);
  const [totalItems, settotalitems] = useState(0);
  const [totalpages, settotalpages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [CategoryList, setCategoryList] = useState([]);
  const [SubCategoryList, setSubCategoryList] = useState([]);
  const [ismodelopen, setmodelopen] = useState(false);
  const [selectedproduct, setSelectedproduct] = useState<any>(null);
  const [categotyid, setproductid] = useState("");
  const [isconfirmationopen, setisconfirmationopen] = useState(false);
  const pageSize = 5;
  const productSchema = Yup.object().shape({
    Product_name: Yup.string().required("product name is required"),
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
  useEffect(() => {
    if (selectedproduct?.Category?.Category_Id) {
      fetchsubcategories(selectedproduct?.Category?.Category_Id);
    }
  }, [selectedproduct?.Category?.Category_Id]);
  const fetchcategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/category/categorylist`);

      console.log(response);
      setCategoryList(response?.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchsubcategories = async (category_id: any) => {
    try {
      const response = await axios.get(
        `${API_URL}/Subcategory/subcategory/category/${category_id}`
      );

      console.log(response);
      setSubCategoryList(response?.data.data);
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
  const options_1 = SubCategoryList?.map((item: any) => ({
    value: item.Subcategory_Id,
    label: item.Subcategory_name,
  }));
  const fetchproduct = async (page: number) => {
    setisloading(true);
    try {
      const categories = await axios.get(
        `${API_URL}/product?page=${page}&pagesize=${pageSize}`
      );
      setcategories(categories.data.data);
      settotalitems(categories.data.totalItems);
      settotalpages(categories.data.totalPages);
      setCurrentPage(categories.data.currentPage);
      setisloading(false);
      toast.success("product Fetched Successfully");
    } catch (error) {
      toast.error("Error Fetching product");
    } finally {
      setisloading(false);
    }
  };

  useEffect(() => {
    fetchproduct(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalpages) {
      setCurrentPage(page);
    }
  };
  const handledelete = async (item: any) => {
    setisconfirmationopen(true);
    setproductid(item);
  };

  const handleclose = async () => {
    setisconfirmationopen(false);
  };
  const productdelete = async () => {
    setisloading(true);
    try {
      await axios.delete(`${API_URL}/product/${categotyid}`);

      toast.success("deleted succcessfully");
      fetchproduct(currentPage);
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
    setSelectedproduct(null);
    setmodelopen(false);
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl text-black m-5 font-bold rounded-md">
          Product Management
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
            <th> Name</th>
            <th> Price (LKR)</th>
            <th>Discount(%) per unit</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Categories?.length > 0 ? (
            Categories?.map((item: any, index: any) => (
              <tr key={item?.product_Id} className="">
                <td>
                  <div className="d-flex justify-content-start flex-column">
                    <a className="text-black text-hover-primary fs-6 ">
                      {item?.Product_image ? (
                        <img
                          src={item.Product_image}
                          alt="Product"
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
                      {item?.Product_name ?? "-"}
                    </a>
                  </div>
                </td>
                <td>
                  <div className="d-flex justify-content-start flex-column">
                    <a className="text-black text-lg font-semibold text-hover-primary fs-6">
                      {item?.Product_price ?? "-"}
                    </a>
                  </div>
                </td>
                <td>
                  <div className="d-flex justify-content-start flex-column">
                    <a className="text-black text-lg font-semibold text-hover-primary fs-6">
                      {item?.Product_discount ?? "-"}
                    </a>
                  </div>
                </td>{" "}
                <td>
                  <div className="flex position-relative">
                    <div className="px-5">
                      <button
                        className="bg-black text-white px-2 py-2  rounded-md"
                        onClick={() => {
                          setSelectedproduct(item);
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
                          handledelete(item?.Product_Id);
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
        <div className="fixed inset-0 flex justify-center items-center z-50 ">
          <div
            className="w-[900px] h-[700px] bg-red-200 rounded-lg p-5 shadow-2xl shadow-zinc-500"
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
                  {selectedproduct?.Product_Id ? "Edit" : "Add"} Product
                </h1>
              </div>
              <Formik
                initialValues={{
                  Category_Id: selectedproduct?.Category.Category_Id || "",
                  Subcategory_Id:
                    selectedproduct?.Subcategory.Subcategory_Id || "",

                  Product_name: selectedproduct?.Product_name || "",
                  Product_price: selectedproduct?.Product_price || "",
                  Product_discount: selectedproduct?.Product_discount || "",
                  Product_image: selectedproduct?.Product_image || "",
                }}
                onSubmit={async (values, { resetForm }) => {
                  console.log("clicked", values);
                  setisloading(true);
                  try {
                    const ProductData = {
                      Category_Id: values.Category_Id,
                      Subcategory_Id: values.Subcategory_Id,
                      Product_name: values.Product_name,
                      Product_discount: values.Product_discount,
                      Product_price: values.Product_price,
                      Product_image: image || values.Product_image, // Use the base64 string directly
                    };

                    if (selectedproduct?.Product_Id) {
                      await axios.put(
                        `${API_URL}/product/${selectedproduct?.Product_Id}`,
                        ProductData
                      );
                      toast.success("Updated successfully");
                    } else {
                      await axios.post(`${API_URL}/product`, ProductData);
                      toast.success("Added successfully");
                    }
                    fetchproduct(currentPage);

                    resetFormAndClose(resetForm);
                  } catch (error) {
                    console.error("Error submitting form:", error);
                    toast.error("Error saving category");
                  } finally {
                    setisloading(false);
                  }
                }}
                validationSchema={productSchema}
              >
                {({ values, getFieldProps, handleSubmit, setFieldValue }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="flex flex-row m-5 gap-2">
                      <div className="basis-1/2 ">
                        <div className="flex flex-col">
                          <div className="flex flex-row justify-center items-center">
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
                              ) : selectedproduct?.Product_image ? (
                                <img
                                  src={selectedproduct?.Product_image}
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
                          <div className="flex flex-col justify-center items-center">
                            <label className="text-black mb-4">Category</label>
                            <div>
                              <Select
                                options={options}
                                value={options.find(
                                  (option) =>
                                    option.value === values.Category_Id
                                )} // Ensure the correct value is selected
                                onChange={(option) => {
                                  setFieldValue("Category_Id", option?.value);
                                  fetchsubcategories(option?.value);
                                }} // Pass only the value
                                styles={{
                                  control: (baseStyles) => ({
                                    ...baseStyles,
                                    backgroundColor: "black",
                                    color: "white",
                                    width: "200px",
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
                            </div>
                            <label className="text-black mb-4">
                              Subcategory
                            </label>
                            <div className="mb-10">
                              <Select
                                options={options_1}
                                value={options_1.find(
                                  (option) =>
                                    option.value === values.Subcategory_Id
                                )}
                                onChange={(option) =>
                                  setFieldValue("Subcategory_Id", option?.value)
                                }
                                styles={{
                                  control: (baseStyles) => ({
                                    ...baseStyles,
                                    backgroundColor: "black",
                                    color: "white",
                                    width: "200px",

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
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="basis-1/2 flex flex-col  ">
                        <div>
                          <label className="text-black mr-2 ">Name</label>
                        </div>
                        <div>
                          <input
                            type="text"
                            className="w-[300px] h-[40px]  p-2 mt-2"
                            {...getFieldProps("Product_name")}
                          />
                        </div>

                        <label className="text-black my-2">
                          Price {"(LKR)"}
                        </label>
                        <input
                          type="number"
                          className=" p-2 w-[300px] "
                          {...getFieldProps("Product_price")}
                        />

                        <label className="text-black my-2">
                          Discount {"(%)"}
                        </label>
                        <input
                          type="number"
                          className=" p-2  w-[300px]"
                          {...getFieldProps("Product_discount")}
                        />

                        <div className=" flex flex-row position-relative justify-end gap-2 m-2 mt-10">
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
          handledelete={productdelete}
          setmodelclose={handleclose}
        />
      )}
      {isloading && <CommonLoading />}
    </div>
  );
};

export default Product;
