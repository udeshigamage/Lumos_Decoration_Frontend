import React from "react";

const Orderhistory = () => {
  const mycart = [
    {
      Orderid: "01",
      category: "flowers boquets",
      item_name: "rose",
      quantity: 1,
      price: 1000,
      total: 1000,
      Status: "Pending",
      Employee: "John Doe",
      AllowanceStatus: "not paid",
    },
    {
      Orderid: "01",
      category: "flowers boquets",
      item_name: "rose",
      quantity: 1,
      price: 1000,
      total: 1000,
      Status: "Pending",
      Employee: "John Doe",
      AllowanceStatus: "not paid",
    },
    {
      Orderid: "01",
      category: "flowers boquets",
      item_name: "rose",
      quantity: 1,
      price: 1000,
      total: 1000,
      Status: "Pending",
      Employee: "John Doe",
      AllowanceStatus: "not paid",
    },
    {
      Orderid: "01",
      category: "flowers boquets",
      item_name: "rose",
      quantity: 1,
      price: 1000,
      total: 1000,
      Status: "Pending",
      Employee: "John Doe",
      AllowanceStatus: "not paid",
    },
    {
      Orderid: "01",
      category: "flowers boquets",
      item_name: "rose",
      quantity: 1,
      price: 1000,
      total: 1000,
      Status: "Pending",
      Employee: "John Doe",
      AllowanceStatus: "not paid",
    },
    {
      Orderid: "01",
      category: "flowers boquets",
      item_name: "rose",
      quantity: 1,
      price: 1000,
      total: 1000,
      Status: "Pending",
      Employee: "John Doe",
      AllowanceStatus: "not paid",
    },
  ];
  return (
    <div className="bg-gradient-to-r from-white to-red-200 min-h-screen">
      <div>
        <div className="flex flex-row justify-between bg-red-950 w-full p-5">
          <h1 className="font-serif text-lg font-bold text-white ">
            Order History
          </h1>
          <button className="btn btn-sm btn-primary text-white">Home</button>
        </div>

        <table className="table border-white bg-red-100 opacity-90 text-black  font-serif w-3/4 m-5 ">
          {/* head */}
          <thead className="text-black text-xl">
            <tr>
              {/* <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th> */}

              <th>Order id</th>
              <th> Category</th>
              <th>Item name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Status </th>
              <th>Employee</th>
              <th>Allowance Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mycart?.length > 0 ? (
              mycart?.map((item: any, index: any) => (
                <tr>
                  <td>
                    <div className="d-flex justify-content-start flex-column">
                      <a className="text-black text-hover-primary fs-6">
                        {item?.Orderid ?? "-"}
                      </a>
                    </div>
                  </td>

                  <td>
                    <div className="d-flex justify-content-start flex-column">
                      <a className="text-black text-hover-primary fs-6">
                        {item?.category ?? "-"}
                      </a>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-start flex-column">
                      <a className="text-black text-hover-primary ">
                        {item?.item_name ?? "-"}
                      </a>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-start flex-column">
                      <a className="text-black text-hover-primary fs-6 ">
                        {item?.quantity ?? "-"}
                      </a>
                    </div>
                  </td>
                  <td>
                    <a className=" text-hover-primary fs-6 px-5 py-5 rounded-md ">
                      {item?.price ?? "-"}
                    </a>
                  </td>
                  <td>
                    <a className=" text-hover-primary fs-6 px-5 py-5 rounded-md ">
                      {item.price * item.quantity}
                    </a>
                  </td>
                  <td>
                    <a className=" text-hover-primary  rounded-md text-white bg-black p-2  ">
                      {item?.Status ?? "not started"}
                    </a>
                  </td>
                  <td>
                    <a className=" text-hover-primary fs-6 px-5 py-5 rounded-md ">
                      {item?.Employee ?? "-"}
                    </a>
                  </td>
                  <td>
                    <a className=" text-hover-primary fs-6 px-5 py-5 rounded-md ">
                      {item?.AllowanceStatus ?? "-"}
                    </a>
                  </td>
                  <td>
                    <button className="btn btn-md btn-primary text-black p-2">
                      track order
                    </button>
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
  );
};

export default Orderhistory;
