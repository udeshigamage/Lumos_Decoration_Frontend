import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
const data = [
  { name: "January", Sales: 400 },
  { name: "February", Sales: 300 },
  { name: "March", Sales: 200 },
  { name: "April", Sales: 278 },
  { name: "May", Sales: 189 },
  { name: "June", Sales: 239 },
];
const Report = () => {
  return (
    <div>
      <h1 className="text-2xl text-white font-bold font-serif">Report</h1>
      <div className="my-10">
        <select className="select select-bordered w-full max-w-xs">
          <option disabled selected>
            Select Report
          </option>
          <option>Revenue report</option>
          <option>Employee rating report</option>
          <option>Order prediction report</option>
        </select>
      </div>
      <div>
        <div style={{ width: "60%", margin: "0 auto" }}>
          <BarChart
            width={600}
            height={300}
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Sales" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="btn btn-primary">Generate Report</button>
      </div>
    </div>
  );
};

export default Report;
