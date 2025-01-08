import React, { useState } from "react";
import Navbarcustomer from "./Navbarcustomer";
import { useLocation } from "react-router-dom";

const Addtobooking = () => {
  const location = useLocation();
  const [ver, setver] = useState("white");
  const [name, setname] = useState("Book Now");
  const [isbooked, setisbooked] = useState(false);
  const image = location.state?.image;
  return (
    <div>
      <Navbarcustomer />
      <div className="flex flex-row gap-5">
        <div className="basis-1/2 my-20 mx-5">
          <h1 className="text-2xl text-white font-bold font-serif">
            Flower Bouquets
          </h1>
          <p className="my-10">
            {" "}
            welcome to lumos decorations,your go to destination for exquisite
            floral arrangements and personalized gifts.nestled in heart of
            jaffna,we take prode in bringing your celebrations to life with our
            unique and artistic creations.
          </p>
          <div className="flex bg-slate-100 w-full h-20 rounded-md">
            <p className="text-black font-serif px-5 py-5 text-2xl ">
              General cost range/Flower:LKR 200
            </p>
          </div>

          <button
            className="btn btn-primary my-10"
            style={{ backgroundColor: ver }}
            onClick={() => {
              setver("green");
              setname("Booked");
              setisbooked(true);
            }}
          >
            {name}
          </button>
          {isbooked && (
            <button
              className="btn btn-primary my-10 mx-20"
              style={{ backgroundColor: "red" }}
              onClick={() => {
                setver("white");
                setname("Book Now");
                setisbooked(false);
              }}
            >
              remove
            </button>
          )}
        </div>
        <div className="basis-1/2 ml-20 my-20">
          <img src={image} width={400} height={400} className="rounded-md" />
          <a
            className="btn btn-primary my-10 ml-24"
            href="/customer/ordersummary"
          >
            View my Order history
          </a>
        </div>
      </div>
    </div>
  );
};

export default Addtobooking;
