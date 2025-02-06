const Contact_us = () => {
  return (
    <div id="contact_us" className="bg-white">
      <div className="flex   min-h-screen px-5 py-5 justify-center ">
        {/* <div className="basis-1/3 ">
            <div className="flex flex-row items-start justify-center min-h-screen">
              <div className="px-5 py-5 self-center z-30">
                <h1>Address</h1>
                <span>no 262/E</span>
                <span>ihalabiyanwiiila</span>
                <span>mankada road</span>
                <span> kadawtha</span>
                <h1 className="mt-5">Contact Number</h1>
                <span>077-1234567</span>
              </div>
            </div>
          </div> */}

        <div className=" bg-gradient-to-r from-amber-100 to-red-200 p-10 rounded-lg">
          <div className="px-5 py-5">
            <h1 className=" font-serif text-6xl text-black font-bold">
              <span className="text-red-950">C</span>ontact{" "}
              <span className="text-red-950">U</span>s
            </h1>
          </div>
          <div className="flex flex-col">
            <div className="px-5 py-5">
              <input
                type="text"
                placeholder="Full name"
                className="input input-bordered w-full max-w-md"
              />
            </div>
            <div className="px-5 py-5 w-">
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full max-w-md "
              />
            </div>
            <div className="px-5 py-5">
              <textarea
                placeholder="Message"
                className="textarea textarea-bordered textarea-lg w-full max-w-md"
              ></textarea>
            </div>
            <div className="px-5 py-5">
              <button className="btn btn-wide">Contact us</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact_us;
