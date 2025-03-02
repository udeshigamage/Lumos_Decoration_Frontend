import React from "react";

const Product = () => {
  const Employee = [
    {
      emp_ID: "1",
      emp_Name: "John Doe",
      emp_Department: "Sales",
      emp_Designation: "Manager",
      emp_Phone: "1234567890",
      emp_Role: "Admin",
    },
  ];
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl text-black m-5 font-bold rounded-md">
        Product Management
      </h1>
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
                        //   onClick={() => {
                        //     setSelectedEmployee(item);
                        //     setmodelopen(true);
                        //   }}
                      >
                        Edit
                      </button>
                    </div>
                    <div>
                      <button
                        className="bg-black  text-white px-2 py-2  rounded-md"
                        //   onClick={() => {
                        //     handledelete(item?.emp_ID);
                        //   }}
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
    </div>
  );
};

export default Product;
