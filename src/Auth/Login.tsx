import { useNavigate } from "react-router-dom";

import pic07 from "../assets/pico9.jpg";

const Login = () => {
  return (
    <div>
      <div className="flex flex-row">
        <div className="basis-1/2 ">
          <img
            src={pic07}
            className="h-full w-full object-cover h-screen animate-pulse"
          />
        </div>
        <div className="basis-1/2 flex justify-center items-center bg-white ">
          <div className="flex flex-col items-center">
            <div className="flex flex-row gap-2">
              <a href="/" className="flex align-center">
                <span className="text-6xl text-black animate-pulse ">«</span>
              </a>
              <h1 className="mt-4 text-6xl font-serif text-black font-bold mb-4">
                <span className="text-red-950">L</span>ogin
              </h1>
            </div>

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
