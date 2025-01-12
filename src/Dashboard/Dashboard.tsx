import axios from "axios";
import { Chart } from "chart.js";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Pie,
} from "recharts";
const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
  datasets: [
    {
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
const data2 = [
  { month: "Jan", sales: 30 },
  { month: "Feb", sales: 50 },
  { month: "Mar", sales: 70 },
  { month: "Apr", sales: 90 },
  { month: "May", sales: 120 },
];
const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [pendingordercount, setpendingordercount] = useState(0);
  const [newordercount, setnewordercount] = useState(0);
  const [completedordercount, setcompletedordercount] = useState(0);
  useEffect(() => {
    fetchordercount();
  }, []);
  const fetchordercount = async () => {
    const response = await axios.get(`${API_URL}/Order/orderscount`);
    setpendingordercount(response.data.pending);
    setnewordercount(response.data.new);
    setcompletedordercount(response.data.completed);
  };
  return (
    <div>
      <div className=" grid grid-cols-3 gap-8 justify-self-center">
        <div className="bg-slate-400 w-64 h-32  rounded-md">
          <p className="text-black font-serif text-2xl px-5 py-5">New Orders</p>
          <p className="text-black font-extrabold text-4xl px-5">
            {newordercount}
          </p>
        </div>
        <div className="bg-slate-400 w-64 h-32  rounded-md">
          <p className="text-black font-serif text-2xl  px-5 py-5">
            Pending Orders
          </p>
          <p className="text-black font-extrabold text-4xl px-5">
            {pendingordercount}
          </p>
        </div>
        <div className="bg-slate-400 w-64 h-32  rounded-md">
          <p className="text-black font-serif text-2xl px-5 py-5">
            Completed Orders
          </p>
          <p className="text-black font-extrabold text-4xl px-5">
            {completedordercount}
          </p>
        </div>
      </div>
      <div className="mt-20 mb-5  ">
        <LineChart width={600} height={300} data={data2}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
      <div></div>
    </div>
  );
};

export default Dashboard;
