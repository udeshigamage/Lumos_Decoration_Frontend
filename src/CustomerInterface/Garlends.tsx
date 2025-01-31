import { url } from "inspector";
import React from "react";
import pico5 from "../assets/pic05.jpg";

const Garlends = () => {
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
      <div className="flex flex-row gap-2  bg-red-950 w-full p-2">
        <a href="/customer/services">
          <h1 className="text-4xl font-serif text-white  ">{"<-"}</h1>
        </a>
        <h1 className="text-4xl font-serif text-white">Garlands</h1>
      </div>

      <div className="grid grid-cols-3 grid-rows-3 gap-5 p-5">
        {garlands.map((item, index) => (
          <div key={index} className="card w-96 bg-white text-black shadow-xl">
            <figure>
              <img src={pico5} alt="gralands" className="w-full h-60" />
            </figure>
            <div className="card-body">
              <h2 className="card-title bg-red-400 rounded-lg p-2 font-serif">
                {item.name}
              </h2>
              <p className="text-black font-bold font-serif text-lg">
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
