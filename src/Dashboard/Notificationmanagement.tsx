import React from "react";

const Notificationmanagement = () => {
  return (
    <div>
      <h1 className="text-4xl text-black font-bold font-serif">
        Notification Management
      </h1>

      <div className="flex position-relative gap-20 my-10">
        <div>
          <label className="label text-black">Select Notification</label>
          <select className="select select-bordered w-full max-w-xs">
            <option disabled selected>
              Select Notification
            </option>
            <option>Order Placed</option>
            <option>Order Delivered</option>
          </select>
        </div>
        <div>
          <label className="label text-black">Notification Title</label>
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
      </div>
      <div className="my-5">
        <label className="label text-black ">Message</label>
        <textarea
          className="textarea textarea-bordered w-full max-w-xs "
          placeholder="Message"
          rows={4}
          cols={50}
        ></textarea>
      </div>
      <div className="my-5">
        <label className="label text-black ">Receipt</label>
        <select className="select select-bordered w-full max-w-xs">
          <option disabled selected>
            Select Receipt
          </option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>
      <div>
        <button className="btn btn-primary">Submit</button>
      </div>
    </div>
  );
};

export default Notificationmanagement;
