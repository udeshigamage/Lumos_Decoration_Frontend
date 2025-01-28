import React from "react";
import pic01 from "../assets/pico10.jpg";
import pic02 from "../assets/pico11.jpg";
import pic03 from "../assets/pico6.jpg";
import pic04 from "../assets/pico18.jpg";
import pic08 from "../assets/pico20.jpg";
import pic05 from "../assets/pico9.jpg";

const Services = () => {
  return (
    <div className="bg-white p-5">
      <h1 className="font-serif text-black px-3 text-6xl mb-5">
        <span className="text-red-950">O</span>ur{" "}
        <span className="text-red-950">S</span>ervices
      </h1>
      <div id="services">
        <div className="carousel carousel-center rounded-box">
          <div className="carousel-item">
            <img src={pic08} alt="Pizza " className="max-h-screen w-10/12" />
          </div>
          <div className="carousel-item">
            <img src={pic08} alt="Pizza" className="max-h-screen w-10/12" />
          </div>
          <div className="carousel-item">
            <img src={pic08} alt="Pizza" className="max-h-screen w-10/12" />
          </div>
          <div className="carousel-item">
            <img src={pic08} alt="Pizza" className="max-h-screen w-10/12" />
          </div>
          <div className="carousel-item">
            <img src={pic08} alt="Pizza" className="max-h-screen w-10/12" />
          </div>
          <div className="carousel-item">
            <img src={pic08} alt="Pizza" className="max-h-screen w-10/12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
