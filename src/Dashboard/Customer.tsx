import axios from "axios";
import React, { useEffect, useState } from "react";

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
const Customer = () => {
  const [customers, setcustomers] = useState([]);
  const [ismodelopen, setmodelopen] = useState(false);

  useEffect(() => {
    fetchcustomers();
  }, []);

  const fetchcustomers = async () => {
    console.log(API_URL);
    try {
      let response = await axios.get(`${API_URL}/Employee`);
      console.log(response);
      console.log(response.data);
      setcustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="px-5 py-5 rounded-lg ">
        {" "}
        <div className="flex flex-row items-center justify-between w-full">
          <div className="">
            <h1 className="text-2xl text-white font-bold font-serif">
              Customer
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
              className="btn btn-primary"
              onClick={() => setmodelopen(true)}
            >
              Add Customer
            </button>
          </div>
        </div>
      </div>
      <div>
        <div style={{ minHeight: "calc(100vh - 320px)" }}>
          <div className="overflow-x-auto">
            <table className="table border-white bg-neutral-800">
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
                {customers?.length > 0 ? (
                  customers?.map((item: any, index: any) => (
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
                        <a className="text-white text-hover-primary fs-6 ">
                          {item?.allowance ?? "-"}
                        </a>
                      </td>
                      <td>
                        <a className="text-white text-hover-primary fs-6 ">
                          <button>Edit</button>
                        </a>
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
            <div className="flex position-relative justify-between gap-2 py-5">
              <input
                type="text"
                placeholder="First name"
                className="input input-bordered w-ful  "
              />
              <input
                type="text"
                placeholder="Last name"
                className="input input-bordered w-full "
              />
            </div>
            <input
              type="text"
              placeholder="Contact Number (+94760305481)"
              className="input input-bordered w-full py-5"
            />
            <select className="select select-bordered w-full mt-5">
              <option disabled selected>
                Select Role
              </option>
              <option>Floral Designer</option>
              <option>Event Stylist</option>
              <option>Visual Merchandiser</option>
              <option>Event Coordinator</option>
              <option>Customer Service Representative</option>
              <option>Other</option>
            </select>
            <input
              type="number"
              placeholder="Allowance"
              className="input input-bordered w-full mt-5"
            />
            <div className="modal-action ">
              <div className="flex positon-relative gap-5">
                <button className="btn">Submit</button>
                <button className="btn" onClick={() => setmodelopen(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Customer;
