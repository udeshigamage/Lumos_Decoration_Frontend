import React from "react";

const Ordersummary = () => {
  return (
    <div>
      <h1>Ordered Services</h1>
      <div className="flex position-relative gap-5">
        <label className="label">Choose delivery date</label>
        <input type="date" className="input input-bordered w-full max-w-xs" />
      </div>
      <div className="flex position-relative gap-5">
        <input type="checkbox" className="checkbox" />
        <label className="label">Flower boquet</label>
        <input type="checkbox" className="checkbox" />
        <label className="label">Flower boquet</label>
      </div>
      <div className="flex position-relative gap-5">
        <textarea
          className="textarea textarea-bordered h-24 w-96"
          placeholder="Write your message here"
        ></textarea>
        <textarea
          className="textarea textarea-bordered h-24 w-96"
          placeholder="Write your message here"
        ></textarea>
      </div>
      <div className="flex position-relative gap-5">
        <button className="btn btn-primary">Submit</button>
        <button className="btn btn-primary">Cancel</button>
      </div>
    </div>
  );
};

export default Ordersummary;
