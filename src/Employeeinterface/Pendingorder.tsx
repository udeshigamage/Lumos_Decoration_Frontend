import React from "react";
import SideNavigationPanel2 from "./SideNavigation";
import pico5 from "../assets/pic05.jpg";

const Pendingorder = () => {
  return (
    <div>
      <div className="flex position-relative  bg-gray-500">
        <div className="mt-4 ml-5">
          <a href="/employee">
            {" "}
            <span className="text-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-12"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </a>
        </div>
        <div>
          <h1 className="text-2xl align-middle px-5 py-5 text-black">
            ORDER ID 5677
          </h1>
        </div>
      </div>

      <div className="flex flex-row gap-5 mt-10">
        <div className="basis-1/2 flex flex-col">
          <div className="flex position-relative mt-10 text-white border-white">
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text px-24 text-xl">Accept order</span>
                <span className="px-10">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-success checkbox-lg px-5"
                  />
                </span>
              </label>
            </div>
          </div>
          <div className="flex position-relative mt-10 text-white border-white">
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text px-24  text-xl">
                  Started Working
                </span>
                <span className="px-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-success checkbox-lg px-5"
                  />
                </span>
              </label>
            </div>
          </div>
          <div className="flex position-relative mt-10 text-white border-white">
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text px-24 text-xl">
                  Completed order
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-success checkbox-lg px-5"
                />
              </label>
            </div>
          </div>
          <div className="flex position-relative mt-10 text-white border-white mb-10">
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text px-24 text-xl">Handed over</span>
                <span className="px-9">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-success checkbox-lg px-5"
                  />
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="basis-1/2 ">
          <p className="text-red-700 text-2xl font-serif bg-slate-400 w-96 rounded-md px-5 py-5">
            {" "}
            DEADLINE :-20/12/2023
          </p>
          <p className="my-10 text-2xl font-serif text-black bg-slate-400 rounded-md px-5 py-5 w-3/4">
            Approximated Allowance:{" "}
            <span className="text-red-500">{""} 2000LKR</span>
          </p>
          <div className="border-2 border-white rounded-md px-5 py-5 w-3/4">
            <h1 className="text-2xl font-serif">Order Details</h1>
            <div className="flex flex-row">
              <div className="basis-1/2 mt-10">
                <p>order id: 5677</p>
                <p>order date: 20/12/2023</p>
                <p>order status: pending</p>
                <p>order description</p>
              </div>
              <div className="basis-1/2 mt-10">
                <img src={pico5} className="rounded-md"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pendingorder;
