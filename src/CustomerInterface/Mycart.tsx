import React, { useEffect, useState } from "react";
import mycartp from "../assets/pic22.jpg";
import { useNavigate } from "react-router-dom";

const Mycart = () => {
  const navigate = useNavigate();
  const [cartitems, setcartitems] = useState([]);
  const getCartItems = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  };
  const handledelete = (id: any) => {
    const cart = localStorage.getItem("cart");
    let parsedCart = cart ? JSON.parse(cart) : [];
    const updatedCart = parsedCart.filter((item: any) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setcartitems(updatedCart);
  };
  useEffect(() => {
    setcartitems(getCartItems());
  }, []);
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
          <h1 className="text-4xl font-serif text-white bg-gray-500 bg-opacity-50  animate-pulse m-3 hover:bg-white hover:text-black  p-1 rounded-lg hover:bg-red-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
              />
            </svg>
          </h1>
          <h1 className="font-serif text-2xl font-bold text-white p-2 mt-2   ">
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
            {cartitems?.length > 0 ? (
              cartitems?.map((item: any, index: any) => (
                <tr>
                  <td>
                    <div className="d-flex justify-content-start flex-column">
                      <a className="text-black text-hover-primary fs-6">
                        {item?.id ?? "-"}
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
                        {item?.name ?? "-"}
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
                  <td className="flex flex-row position-relative gap-2">
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handledelete(item.id);
                      }}
                    >
                      Delete
                    </button>
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
