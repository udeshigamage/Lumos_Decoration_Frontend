import React from "react";
import Navbarcustomer from "./Navbarcustomer";
import { useLocation } from "react-router-dom";

const Addtobooking = () => {
  const location = useLocation();
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

          <button className="btn btn-primary my-10">Add to Booking</button>
        </div>
        <div className="basis-1/2 ml-20 my-20">
          <img src={image} width={400} height={400} />
        </div>
      </div>
    </div>
  );
};

export default Addtobooking;
