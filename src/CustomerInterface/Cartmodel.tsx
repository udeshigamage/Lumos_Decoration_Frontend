import React from "react";
import pic05 from "../assets/pic05.jpg";
type Props = {
  isopen: boolean;
  isclose: () => void;
};
const Cartmodel: React.FC<Props> = ({ isopen, isclose }) => {
  if (!isopen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-row gap-2">
          <div className="basis-1/2 w-full h-full bg-red">
            <img src={pic05} alt="" className=" object-cover w-72 h-72" />
            <h1>click picture to Enlarge</h1>
          </div>
          <div className="basis-1/2 w-full text-black bg-amber-100">
            <div className="flex flex-col">
              <h1>Product Id:345</h1>
              <h1>Rose Garlend:345</h1>
              <h1>Rating:345</h1>
              <h1>Price :3450</h1>
              <h1>Discount:10%</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end">
          <div className="flex flex-row position-relative gap-2">
            <button
              onClick={isclose}
              className="mt-4 justify-end text-white bg-black p-3 rounded-lg"
            >
              Close
            </button>
            <button
              // onClick={isclose}
              className="mt-4 justify-end text-white bg-black p-3 rounded-lg"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartmodel;
