import React from "react";

const Navbarcustomer = () => {
  return (
    <div>
      <div className="navbar bg-base-100 bg-slate-500 fixed">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Lumos Decorations</a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <select className="select select-bordered w-full max-w-xs">
              <option defaultChecked>Services</option>
              <option>Orders</option>
            </select>
          </div>
          <button className="btn btn-sm mx-5">Contact us</button>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbarcustomer;
