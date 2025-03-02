import React, { useEffect, useState } from "react";
import Loader from "../../Util/Loader";
import CommonLoading from "../../Util/Commonloading";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";
import { Formik } from "formik";
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
import Category from "./Category";
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
    product_name: Yup.string().required("product name is required"),
    description: Yup.string().required("Description is required"),
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
      const response = await axios.get(`${API_URL}/category/categorylist`);

      console.log(response);
      setCategoryList(response?.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchsubcategories = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/Subcategory/Subcategorylist`
      );

      console.log(response);
      setSubCategoryList(response?.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchcategories();
    fetchsubcategories();
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
      await axios.delete(`${API_URL}/product/delete/${categotyid}`);

      toast.success("deleted succcessfully");
      fetchproduct(currentPage);
    } catch (error) {
      toast.error("error");
    } finally {
      setTimeout(() => {
        setisloading(false);
      }, 1000);
    }
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
          // height: "500px",
        }}
      >
        <thead className="text-black text-xl">
          <tr>
            <th>Image </th>
            <th> Name</th>
            <th> Price </th>
            <th>Discount</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Categories?.length > 0 ? (
            Categories?.map((item: any, index: any) => (
              <tr key={item?.product_Id} className="">
                <td>
                  <div className="d-flex justify-content-start flex-column">
                    <a className="text-black text-hover-primary fs-6">
                      {item?.Product_image ?? "-"}
                    </a>
                  </div>
                </td>
                <td>
                  <div className="d-flex justify-content-start flex-column">
                    <a className="text-black text-lg text-hover-primary fs-6">
                      {item?.Product_name ?? "-"}
                    </a>
                  </div>
                </td>
                <td>
                  <div className="d-flex justify-content-start flex-column">
                    <a className="text-black text-hover-primary fs-6">
                      {item?.Product_price ?? "-"}
                    </a>
                  </div>
                </td>
                <td>
                  <div className="d-flex justify-content-start flex-column">
                    <a className="text-black text-hover-primary fs-6">
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
                          handledelete(item?.product_Id);
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
                  <div className="text-center">
                    <Loader />
                  </div>
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
                  {selectedproduct?.Product_Id ? "Edit" : "Add"} Product
                </h1>
              </div>
              <Formik
                initialValues={{
                  Category_Id: selectedproduct?.Category_Id || "",
                  Subcategory_Id: selectedproduct?.Subcategory_Id || "",
                  Product_Id: selectedproduct?.Product_Id || "",
                  Product_name: selectedproduct?.Product_name || "",
                  Product_price: selectedproduct?.Product_price || "",
                  Product_discount: selectedproduct?.Product_discount || "",
                  Product_image: selectedproduct?.Product_image || "",
                }}
                onSubmit={async (values, { resetForm }) => {
                  setisloading(true);
                  try {
                    const formdata = new FormData();
                    formdata.append("Product_name", values.Product_name);
                    formdata.append("Product_price", values.Product_price);
                    formdata.append(
                      "Product_discount",
                      values.Product_discount
                    );
                    if (image) {
                      formdata.append("Product_image", image);
                    }
                    if (selectedproduct?.Product_Id) {
                      await axios.put(`${API_URL}/product`, formdata, {
                        headers: { "Content-Type": "multipart/form-data" },
                      });
                      console.log(Object.fromEntries(formdata.entries()));

                      toast.success("updated succcessfully");
                    } else {
                      await axios.post(
                        `${API_URL}/product`,
                        //product_image:values.product_image,
                        formdata,
                        {
                          headers: { "Content-Type": "multipart/form-data" },
                        }
                      );

                      console.log(Object.fromEntries(formdata.entries()));
                      toast.success("added successfully");
                      fetchproduct(currentPage);
                    }
                  } catch (error) {
                    toast.error("error");
                  } finally {
                    setTimeout(() => {
                      setisloading(false);
                    }, 1000);
                    resetForm();
                    setImage(null);
                    setmodelopen(false);
                  }
                }}
                validationSchema={productSchema}
              >
                {({ values, getFieldProps, resetForm, setFieldValue }) => (
                  <form>
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
                        <div>
                          {/* <div className="flex flex-col  align-middle">
                            <input
                              type="text"
                              className="w-[100px] h-[40px] rounded-xl bg-white p-2 text-black text-xl font-bold "
                              placeholder="product Id"
                              {...getFieldProps("product_Id")}
                              disabled
                            />
                          </div> */}
                        </div>
                        <div className="flex flex-row position-reltive gap-2">
                          <div>
                            <Select
                              options={options}
                              value={values.Category_Id}
                              onChange={(option) =>
                                setFieldValue("Category_Id", option)
                              }
                            />
                          </div>
                          <div>
                            <Select
                              options={options_1}
                              value={values.Subcategory_Id}
                              onChange={(option) =>
                                setFieldValue("Subcategory_Id", option)
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-black mr-2 ">Name</label>
                        </div>
                        <div>
                          <input
                            type="text"
                            className="w-[300px] h-[40px] rounded-xl p-2 mt-2"
                            {...getFieldProps("Product_name")}
                          />
                        </div>
                        <div>
                          <label className="text-black mb-4">Price</label>
                          <input
                            type="number"
                            className="rounded-xl p-2 mt-2"
                            {...getFieldProps("Product_price")}
                          />
                        </div>
                        <div>
                          <label className="text-black mb-4">Discount</label>
                          <input
                            type="number"
                            className="rounded-xl p-2 mt-2"
                            {...getFieldProps("Product_discount")}
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
                  </form>
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
