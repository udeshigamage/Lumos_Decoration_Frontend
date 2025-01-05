import React from "react";

const Ordersummary = () => {
  return (
    <div>
      <h1>Ordered Services</h1>
      <div className="flex position-relative gap-5">
        <label className="label">Choose delivery date</label>
        <input type="date" className="input input-bordered w-full max-w-xs" />
      </div>
    </div>
  );
};

export default Ordersummary;
