const Ordersummary = () => {
  return (
    <div>
      <div className="flex position-relative  bg-gray-500">
        <div className="mt-4 ml-5">
          <a href="/customer/services">
            {" "}
            <span className="text-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-12"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </a>
        </div>
        <div>
          <h1 className="text-2xl align-middle px-5 py-5 text-black">
            ORDER Summary
          </h1>
        </div>
      </div>

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
      <div>
        <p>once we estimate your order, we will contact you</p>
        <p>we make sure your order is delivered on time</p>
      </div>
    </div>
  );
};

export default Ordersummary;
