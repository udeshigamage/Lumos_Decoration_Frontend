import React from "react";
import pic07 from "../assets/pic07.jpg";
import pic0567 from "../assets/pic0567.jpg";

const Login = () => {
  return (
    <div>
      <div className="flex flex-row">
        <div className="basis-1/2 ">
          <img src={pic0567} className="h-screen" />
        </div>
        <div
          className="basis-1/2 flex justify-center items-center bg-fuchsia-200 "
          style={{ backgroundImage: `url(${pic0567})` }}
        >
          <div className="flex flex-col items-center">
            <h1 className="text-6xl font-serif text-black font-bold mb-4">
              Login
            </h1>
            <div className="px-5 py-5 w-full">
              <input
                type="text"
                placeholder="Username"
                className="input input-bordered w-full min-w-96"
              />
            </div>
            <div className="px-5 py-5 w-full">
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full min-w-96"
              />
            </div>
            <div className="px-5 py-5">
              <button className="btn btn-wide">Login</button>
            </div>
            <div>
              <p className="text-gray-500">
                Don&apos;t have an account?{" "}
                <a
                  href="/signup"
                  className="text-main font-medium text-slate-950 hover:text-red-700 underline"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
