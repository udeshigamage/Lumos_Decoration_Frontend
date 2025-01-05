import React from "react";

import flower3 from "../assets/flower3.jpg";
import flower1 from "../assets/flower1.jpg";
import flower2 from "../assets/flower2.jpg";
import candle5 from "../assets/candle5.jpg";
import candle6 from "../assets/candle6.webp";
import candle9 from "../assets/candle9.png";
import Navbarcustomer from "./Navbarcustomer";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div>
      <Navbarcustomer />
      <div className="grid grid-row-2 gap-10 mx-5 my-5">
        <div className="grid grid-cols-4 gap-5 ">
          <Link to="/customer/addtobooking" state={{ image: flower2 }}>
            <div className="position-relative">
              <img src={flower2} />
              <h1 className="justify-self-center">LKR 200</h1>
            </div>
          </Link>
          <Link to="/customer/addtobooking" state={{ image: flower2 }}>
            <div className="position-relative">
              <img src={flower2} />
              <h1 className="justify-self-center">LKR 200</h1>
            </div>
          </Link>
          <Link to="/customer/addtobooking" state={{ image: flower2 }}>
            <div className="position-relative">
              <img src={flower2} />
              <h1 className="justify-self-center">LKR 200</h1>
            </div>
          </Link>
          <Link to="/customer/addtobooking" state={{ image: flower2 }}>
            <div className="position-relative">
              <img src={flower2} />
              <h1 className="justify-self-center">LKR 200</h1>
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-5 ">
          <Link to="/customer/addtobooking" state={{ image: flower2 }}>
            <div className="position-relative">
              <img src={flower2} />
              <h1 className="justify-self-center">LKR 200</h1>
            </div>
          </Link>
          <Link to="/customer/addtobooking" state={{ image: flower2 }}>
            <div className="position-relative">
              <img src={flower2} />
              <h1 className="justify-self-center">LKR 200</h1>
            </div>
          </Link>
          <Link to="/customer/addtobooking" state={{ image: flower2 }}>
            <div className="position-relative">
              <img src={flower2} />
              <h1 className="justify-self-center">LKR 200</h1>
            </div>
          </Link>
          <Link to="/customer/addtobooking" state={{ image: flower2 }}>
            <div className="position-relative">
              <img src={flower2} />
              <h1 className="justify-self-center">LKR 200</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
