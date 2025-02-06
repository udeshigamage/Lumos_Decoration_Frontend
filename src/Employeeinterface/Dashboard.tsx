const Dashboard = () => {
  return (
    <div className="bg-gradient-to-r from-white to-red-200 ">
      <div className="flex flex-row gap-10 mx-5 mt-5 ">
        <div className="basis-1/3 h-40 bg-slate-600  rounded-md">
          <h1 className="text-white text-2xl px-5 py-3 font-serif">
            Pending works
          </h1>
          <div className="flex position-relative">
            <label className="label">0rder id 8900:</label>
            <a href="employee/pendingorder">view</a>
          </div>
        </div>
        <div className="basis-1/3 h-40 bg-slate-600  rounded-md">
          <h1 className="text-white text-2xl px-5 py-3 font-serif">
            Order Requests
          </h1>
          <div className="flex position-relative">
            <label className="label">0rder id 8900:</label>
            <a href="employee/requestorder">view</a>
          </div>
        </div>
        <div className="basis-1/3 h-40 bg-slate-600  rounded-md">
          <h1 className="text-white text-2xl px-5 py-3 font-serif">
            Completed Works
          </h1>
          <h1 className="text-4xl px-20">34</h1>
        </div>
      </div>
      <div className="flex flex-row ">
        <div className=" basis-1/2 flex flex-col my-28 mx-5">
          <div className="basis-1/3 w-auto bg-slate-600  rounded-md p-5  ">
            <h1 className="text-white text-2xl px-5 py-3 font-serif">
              Total Earning : <span className="text-4xl">30,000</span>
            </h1>
          </div>
          <div className="basis-2/3 w-1/3  bg-slate-600  rounded-md p-5 mt-10 w-auto">
            <h1 className="text-white text-2xl px-5 py-3 font-serif">
              Average rating: <span className="text-4xl">4%</span>
            </h1>
          </div>
        </div>

        <div className="basis-1/2 my-28 mx-5  bg-slate-600 rounded-md">
          <h1 className="text-white text-2xl px-5 font-serif h-52 py-5">
            Total completed orders
            <br />
            {""}
            <span className="text-4xl py-20 px-20">60</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
