import { url } from "inspector";
import React from "react";
import pico5 from "../assets/pic05.jpg";
import { useNavigate } from "react-router-dom";

const Garlends = () => {
  const navigate = useNavigate();
  const garlands = [
    {
      name: "Rose Garland",
      price: "Rs. 1000",
      url: { pico5 },
      discount: "10%",
    },
    {
      name: "Lotus Garland",
      price: "Rs. 1200",
      url: { pico5 },
      discount: "10%",
    },
    {
      name: "Jasmine Garland",
      price: "Rs. 800",
      url: { pico5 },
      discount: "10%",
    },
    {
      name: "Araliya Garland",
      price: "Rs. 900",
      url: { pico5 },
      discount: "10%",
    },
    {
      name: "Blossom Garland",
      price: "Rs. 700",
      url: { pico5 },
      discount: "10%",
    },
    {
      name: "Dahaspetiya Garland",
      price: "Rs. 450",
      url: { pico5 },
      discount: "10%",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-white to-red-100 min-h-screen">
      <div className="flex flex-row justify-between  bg-red-950 w-full p-2">
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
            <h1 className="text-3xl font-serif text-white mt-2">Garlends</h1>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
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
            <div className="card-body">
              <h2 className="card-title  rounded-lg p-2 font-serif">
                {item.name}
              </h2>
              <p className="text-red-600 text-sm font-bold font-serif text-lg">
                {item.price}
              </p>
              <div className="card-actions justify-between">
                <h1 className="text-black font-bold font-serif text-lg">
                  Quantity
                </h1>
                <input
                  type="number"
                  placeholder="0"
                  className="bg-white text-black border-black border-2 w-20 rounded-lg p-2 font-serif"
                />
              </div>
              <div className="card-actions justify-between font-serif">
                <h1>
                  {" "}
                  <span className="text-red-600">{item.discount}</span> Discount
                  Available
                </h1>
                <button className="btn btn-primary bg-black text-white hover:bg-gray-600 font-serif">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Garlends;
