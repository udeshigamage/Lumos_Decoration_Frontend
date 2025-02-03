import React from "react";
type Props = {
  isopen: boolean;
  isclose: () => void;
};
const Trackorder: React.FC<Props> = ({ isopen, isclose }) => {
  if (!isopen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-black font-serif">Track Order</h2>
        <ul className="steps steps-vertical lg:steps-horizontal text-black font-serif">
          <li className="step step-primary">Pending</li>
          <li className="step step-primary">Accepted</li>
          <li className="step">Started working</li>
          <li className="step">Completed</li>
          <li className="step">Delivered</li>
        </ul>

        <div className="flex flex-col gap-2 mt-2 ">
          <div className="flex flex-row position-relative justify-center  gap-2 mt-4 font-serif">
            <h1 className="w-50 m-2 pl-4">Employee</h1>
            <input
              type="text"
              placeholder="Assigned Employee"
              className="input input-bordered w-50 max-w-xs text-white"
            />
          </div>
          <div className="flex flex-row position-relative justify-center  gap-2 mt-4 font-serif">
            <h1 className="w-50 m-2 pl-4">Allowances</h1>
            <input
              type="text"
              placeholder="Assigned Employee"
              className="input input-bordered w-50 max-w-xs text-white"
            />
          </div>
        </div>
        <div className="flex flex-row justify-end">
          <button
            onClick={isclose}
            className="mt-4 justify-end text-white bg-black p-3 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trackorder;
