import React from "react";
import mycartp from "../assets/pic22.jpg";
import { useNavigate } from "react-router-dom";

const Mycart = () => {
  const navigate = useNavigate();
  const mycart = [
    {
      product_id: "01",
      category: "flowers boquets",
      item_name: "rose",
      quantity: 1,
      price: 1000,
      total: 1000,
    },
    {
      product_id: "01",
      category: "flowers boquets",
      item_name: "rose",
      quantity: 1,
      price: 1000,
      total: 1000,
    },
    {
      product_id: "01",
      category: "flowers boquets",
      item_name: "rose",
      quantity: 1,
      price: 1000,
      total: 1000,
    },
    {
      product_id: "01",
      category: "flowers boquets",
      item_name: "rose",
      quantity: 1,
      price: 1000,
      total: 1000,
    },
    {
      product_id: "01",
      category: "flowers boquets",
      item_name: "rose",
      quantity: 1,
      price: 1000,
      total: 1000,
    },
    {
      product_id: "01",
      category: "flowers boquets",
      item_name: "rose",
      quantity: 1,
      price: 1000,
      total: 1000,
    },
  ];
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url(${mycartp})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-row justify justify-between bg-red-950 w-full mb-5">
        <div className="flex flex-row position-relative">
          <button
            className="btn-primary text-white font-serif font-bold  hover:bg-red-400 rounded-lg m-1 "
            onClick={() => navigate(-1)}
          >
            {"<<"}
          </button>
          <h1 className="font-serif text-2xl font-bold text-white p-2   ">
            My cart
          </h1>
        </div>
        <button
          className="btn btn-danger text-lg bg-green-500 p-2 m-2 text-black font-serif hover:bg-green-900"
          onClick={() => {
            navigate("/customer/mycart/checkout");
          }}
        >
          Continue
        </button>
      </div>

      <div className="flex flex-col justify-center items-center ">
        <table className="table border-white bg-red-100 opacity-90 text-black  font-serif w-3/4 ">
          {/* head */}
          <thead className="text-black text-xl">
            <tr>
              {/* <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th> */}

              <th>Product Id</th>
              <th> Category</th>
              <th>Item name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mycart?.length > 0 ? (
              mycart?.map((item: any, index: any) => (
                <tr>
                  <td>
                    <div className="d-flex justify-content-start flex-column">
                      <a className="text-black text-hover-primary fs-6">
                        {item?.product_id ?? "-"}
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
                      {item?.total ?? "-"}
                    </a>
                  </td>
                  <td className="flex flex-row position-relative gap-2">
                    <button className="btn btn-danger">Delete</button>
                    <button className="btn btn-danger">Edit</button>
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

export default Mycart;
