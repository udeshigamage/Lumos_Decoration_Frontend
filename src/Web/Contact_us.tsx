import React from "react";
import pic08 from "../assets/pic08.jpg";

const Contact_us = () => {
  return (
    <div id="contact_us">
      <div className="flex  flex-row min-h-screen px-5 py-5 ">
        <div
          className="basis-1/3 "
          style={{
            backgroundImage: `url(${pic08})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover", // optional, to cover the entire element
          }}
        >
          {/* <div className="basis-1/3 ">
            <div className="flex flex-row items-start justify-center min-h-screen">
              <div className="px-5 py-5 self-center z-30">
                <h1>Address</h1>
                <span>no 262/E</span>
                <span>ihalabiyanwiiila</span>
                <span>mankada road</span>
                <span> kadawtha</span>
                <h1 className="mt-5">Contact Number</h1>
                <span>077-1234567</span>
              </div>
            </div>
          </div> */}
        </div>

        <div className="basis-1/3 bg-white ">
          <div className="px-5 py-5">
            <h1 className="text-6xl text-black font-bold">Contact Us</h1>
          </div>
          <div className="flex flex-col">
            <div className="px-5 py-5">
              <input
                type="text"
                placeholder="Full name"
                className="input input-bordered w-full max-w-md"
              />
            </div>
            <div className="px-5 py-5 w-">
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full max-w-md "
              />
            </div>
            <div className="px-5 py-5">
              <textarea
                placeholder="Message"
                className="textarea textarea-bordered textarea-lg w-full max-w-md"
              ></textarea>
            </div>
            <div className="px-5 py-5">
              <button className="btn btn-wide">Contact us</button>
            </div>
          </div>
        </div>
        <div className="basis-1/3 bg-white ">
          <div className="flex flex-row items-start justify-center min-h-screen">
            <div className="px-5 py-5 self-center z-30">
              <h1>Address</h1>
              <span>no 262/E</span>
              <span>ihalabiyanwiiila</span>
              <span>mankada road</span>
              <span> kadawtha</span>
              <h1 className="mt-5">Contact Number</h1>
              <span>077-1234567</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact_us;
