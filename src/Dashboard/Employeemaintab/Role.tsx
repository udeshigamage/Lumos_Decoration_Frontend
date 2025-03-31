import { useEffect, useState } from "react";

import CommonLoading from "../../Util/Commonloading";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";

import pic045 from "../../assets/pic56.jpg";
import pico23 from "../../assets/pico36.jpg";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import Deleteconfirmation from "../../Util/Deleteconfirmation";

const API_URL = import.meta.env.VITE_API_URL;
const Role = () => {
  const [isloading, setisloading] = useState(false);
  const [roles, setroles] = useState<any>([]);
  const [totalItems, settotalitems] = useState(0);
  const [totalpages, settotalpages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [ismodelopen, setmodelopen] = useState(false);
  const [selectedroles, setSelectedroles] = useState<any>(null);
  const [categotyid, setrolesid] = useState("");
  const [isconfirmationopen, setisconfirmationopen] = useState(false);
  const pageSize = 8;

  const fetchroles = async (page: number) => {
    setisloading(true);
    try {
      const roles = await axios.get(
        `${API_URL}/Role?page=${page}&pagesize=${pageSize}`
      );
      setroles(roles.data.data);
      settotalitems(roles.data.totalItems);
      settotalpages(roles.data.totalPages);
      setCurrentPage(roles.data.currentPage);
      setisloading(false);
      toast.success("Roles Fetched Successfully");
    } catch (error) {
      toast.error("Error Fetching Roles");
    } finally {
      setisloading(false);
    }
  };

  useEffect(() => {
    fetchroles(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalpages) {
      setCurrentPage(page);
    }
  };
  const handledelete = async (item: any) => {
    setisconfirmationopen(true);
    setrolesid(item);
  };

  const handleclose = async () => {
    setisconfirmationopen(false);
  };
  const rolesdelete = async () => {
    setisloading(true);
    try {
      await axios.delete(`${API_URL}/Role/${categotyid}`);

      toast.success("deleted succcessfully");
      fetchroles(currentPage);
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

    setSelectedroles(null);
    setmodelopen(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl text-black m-5 font-bold rounded-md">
          Role Management
        </h1>
        <FaPlus
          color="black"
          size={40}
          className="mt-2 bg-white p-1 rounded-full"
          onClick={() => {
            setSelectedroles(null);
            setmodelopen(true);
          }}
        />
      </div>
      <div className="flex flex-row justify-center items-center">
        <table
          className="table border-white w-[900px] opacity-90 text-black"
          style={{
            backgroundImage: `url(${pic045})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <thead className="text-black text-xl">
            <tr>
              <th>Role Id </th>
              <th>Role name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles?.length > 0 ? (
              roles?.map((item: any, index: any) => (
                <tr key={item?.Roll_ID}>
                  <td>
                    <div className="d-flex justify-content-start flex-column">
                      <a className="text-black text-hover-primary fs-6 text-lg font-semibold">
                        {item?.Role_ID ?? "-"}
                      </a>
                    </div>
                  </td>

                  <td>
                    <div className="d-flex justify-content-start flex-column">
                      <a className="text-black text-hover-primary fs-6 text-lg font-semibold">
                        {item?.Role_Name ?? "-"}
                      </a>
                    </div>
                  </td>

                  <td>
                    <div className="flex position-relative">
                      <div className="px-5">
                        <button
                          className="bg-black text-white px-2 py-2  rounded-md"
                          onClick={() => {
                            setSelectedroles(item);
                            setmodelopen(true);
                          }}
                        >
                          <MdEdit />
                        </button>
                      </div>
                      <div>
                        <button
                          className="bg-black  text-white px-2 py-2  rounded-md"
                          onClick={() => {
                            handledelete(item?.Roll_ID);
                          }}
                        >
                          <MdDelete />
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
      </div>

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
        <div className="fixed inset-0 flex justify-center items-center  z-50">
          <div
            className="w-[400px] h-[300px] bg-red-200 rounded-lg  shadow-2xl shadow-zinc-500"
            style={{
              backgroundImage: `url(${pico23})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "300px",
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
                  {selectedroles?.Roll_ID ? "Edit" : "Add"} roles
                </h1>
              </div>
              <Formik
                initialValues={{
                  roles_name: selectedroles?.Role_Name || "",
                }}
                onSubmit={async (values, { resetForm }) => {
                  setisloading(true);
                  try {
                    const rolesData = {
                      Role_Name: values.roles_name,
                    };

                    if (selectedroles?.Role_ID) {
                      await axios.put(
                        `${API_URL}/Role/${selectedroles.Role_ID}`,
                        rolesData
                      );
                      toast.success("Updated successfully");
                    } else {
                      // Add new roles
                      await axios.post(`${API_URL}/Role`, rolesData);
                      toast.success("Added successfully");
                    }

                    // Refresh the roles list
                    fetchroles(currentPage);
                    resetFormAndClose(resetForm);
                  } catch (error) {
                    console.error("Error submitting form:", error);
                    toast.error("Error saving roles");
                  } finally {
                    setisloading(false);
                  }
                }}
              >
                {({
                  values,
                  getFieldProps,
                  errors,
                  touched,
                  handleSubmit,
                  resetForm,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="flex flex-row m-5 gap-2">
                      <div className="basis-1/2 flex flex-col  ">
                        <div>
                          <label className="text-black mr-2 ">Roles Name</label>
                        </div>
                        <div>
                          <input
                            type="text"
                            className="w-[300px] h-[40px] rounded-xl p-2 mt-2 text-white"
                            {...getFieldProps("roles_name")}
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
                            className="text-white bg-black px-3 py-2 rounded-xl w-[75px]"
                            type="button"
                            onClick={() => resetFormAndClose(resetForm)}
                          >
                            Close
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
          handledelete={rolesdelete}
          setmodelclose={handleclose}
        />
      )}
      {isloading && <CommonLoading />}
    </div>
  );
};

export default Role;
