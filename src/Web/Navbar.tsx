import React from "react";

const Navbar = () => {
  return (
    <div>
      <div
        className="navbar bg-base-100 bg-yellow-600 fixed"
        style={{ minHeight: "48px" }}
      >
        <div className="flex-1">
          <a className="btn btn-ghost text-xl font-serif text-black">
            LUMOS DECORATIONS
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 text-black font-serif">
            <li>
              <a className=" hover:bg-yellow-600" href="#home">
                Home
              </a>
            </li>
            <li>
              <a>Services</a>
            </li>
            <li>
              <a href="#about_us" className=" hover:bg-yellow-600">
                About us
              </a>
            </li>
            <li>
              <a href="#contact_us" className=" hover:bg-yellow-600">
                Contact us
              </a>
            </li>
            <li>
              <a href="/login" className=" hover:bg-yellow-600">
                Sign in
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
