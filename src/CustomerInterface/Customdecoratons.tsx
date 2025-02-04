import { url } from "inspector";
import React from "react";
import pico5 from "../assets/pico2.jpg";
import { useNavigate } from "react-router-dom";

const Customdecoratons = () => {
  const navigate = useNavigate();
  const garlands = [
    {
      name: "Rose Boquets",
      price: "Rs. 1000",
      url: { pico5 },
      discount: "10%",
    },
    {
      name: "Lotus Boquets",
      price: "Rs. 1200",
      url: { pico5 },
      discount: "10%",
    },
    {
      name: "Jasmine Boquets",
      price: "Rs. 800",
      url: { pico5 },
      discount: "10%",
    },
    {
      name: "Araliya  Boquets",
      price: "Rs. 900",
      url: { pico5 },
      discount: "10%",
    },
    {
      name: "Blossom  Boquets",
      price: "Rs. 700",
      url: { pico5 },
      discount: "10%",
    },
    {
      name: "Dahaspetiya Boquets",
      price: "Rs. 450",
      url: { pico5 },
      discount: "10%",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-white to-red-100 min-h-screen">
      <div className="flex flex-row  justify-between h-16 bg-red-950 w-full p-2 ">
        <div>
          <div className="flex flex-row gap-2 ">
            <a href="/customer/services">
              <h1 className="text-4xl font-serif text-white bg-gray-500 bg-opacity-50  animate-pulse mt-2 hover:bg-white hover:text-black  p-1 rounded-lg hover:bg-red-300">
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
            </a>
            <h1 className="text-3xl font-serif text-white mt-2">
              Custom Decorations
            </h1>
          </div>
        </div>
        <div>
          <button
            className="btn-primary text-black font-serif font-bold bg-white hover:bg-red-400 rounded-lg p-2 m-2"
            onClick={() => navigate("/customer/mycart")}
          >
            My cart
          </button>
          <button
            className="btn-primary text-black font-serif font-bold bg-white hover:bg-red-400 rounded-lg p-2"
            onClick={() => navigate("/customer/orderhistory")}
          >
            Order History
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 p-5">
        {garlands.map((item, index) => (
          <div
            key={index}
            className="card bg-white text-black shadow-lg rounded-lg overflow-hidden"
          >
            <figure>
              <img
                src={pico5}
                alt="gralands"
                className="w-full h-40 object-cover"
              />
            </figure>
            <div className="flex flex-col p-1 m-1">
              <h2 className="text-black font-bold  rounded-lg p-1 bg-amber-100 font-serif">
                {item.name}
              </h2>
              <h2 className="text-red-600 text-sm font-bold font-serif text-lg">
                {item.price}
              </h2>
              <div className=" justify-between">
                {/* <h1 className="text-black font-bold font-serif text-lg">
                  Quantity
                </h1>
                <input
                  type="number"
                  placeholder="0"
                  className="bg-white text-black border-black border-2 w-20 rounded-lg p-2 font-serif"
                /> */}
              </div>
              <div className=" justify-between font-serif">
                <h1>
                  {" "}
                  <span className="text-green-600">{item.discount}</span>{" "}
                  Discount Available
                </h1>
              </div>
              <div className=" flex flex-row justify-end">
                <button className="btn btn-sm bg-black text-white hover:bg-gray-600 font-serif w-15">
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
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customdecoratons;
