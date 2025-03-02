import React from "react";
import { IoIosWarning, IoMdCloseCircle } from "react-icons/io";
import pic045 from "../assets/pico37.jpg";

type prop = {
  setmodelclose: () => void;
  handledelete: () => {};
};
const Deleteconfirmation: React.FC<prop> = ({
  setmodelclose,
  handledelete,
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 rounded-lg">
      <div
        className="w-[400px] h-[200px]  rounded-lg"
        style={{
          backgroundImage: `url(${pic045})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "200px",
        }}
      >
        <div className="flex flex-col">
          <div className="flex flex-row justify-end items-center ">
            <IoMdCloseCircle
              size={30}
              color="black"
              className="m-2"
              onClick={setmodelclose}
            />
          </div>
          <div className="flex flex-row justify-center items-center">
            <IoIosWarning color="red" size={40} />
          </div>
          <div className="text-red-600 font-bold text-xl flex flex-row justify-center items-center mt-2">
            Are you sure ,you want to delete this?
          </div>
          <div className="flex flex-row position:relative justify-center gap-2 mt-5">
            <button
              onClick={() => {
                handledelete();
              }}
              className="bg-black text-white px-4 py-1 rounded-lg"
            >
              Yes
            </button>

            <button
              onClick={setmodelclose}
              className="bg-black text-white px-4 py-1 rounded-lg"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deleteconfirmation;
