import axios from "axios";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const API_URL = import.meta.env.VITE_API_URL;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const Home = () => {
  const [orderCounts, setOrderCounts] = useState<Record<string, number>>({});
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    fetchOrderCount();
  }, []);

  const fetchOrderCount = async () => {
    const response = await axios.get(`${API_URL}/Order/orderscount/getcount`);
    setOrderCounts(response.data);
    setTotalIncome(response.data.TotalIncome || 0); // Assuming API returns total income
  };

  const orderData = Object.keys(orderCounts).map((key) => ({
    name: key,
    count: orderCounts[key],
  }));

  return (
    <div className="min-h-screen overflow-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 ">
        Dashboard Overview
      </h1>

      {/* Colorful Order Count Cards */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {orderData.map((data, index) => (
          <div
            key={index}
            className={`p-6 shadow-lg rounded-full text-black text-center font-bold text-lg border-s-slate-900 border-4 from-${
              COLORS[index % COLORS.length]
            } to-${COLORS[(index + 1) % COLORS.length]}`}
          >
            <p>{data.name.replace(/([A-Z])/g, " $1").trim()}</p>
            <p className="text-4xl">{data.count}</p>
          </div>
        ))}
      </div> */}

      {/* Total Income Card */}
      <div className="mt-2 p-3 shadow-lg bg-black text-white rounded-xl text-center">
        <h2 className="text-2xl font-semibold">Total Income</h2>
        <p className="text-4xl font-bold">${totalIncome.toLocaleString()}</p>
      </div>

      {/* Charts Section */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-10 overflow-hidden">
        {/* Bar Chart */}
        <div className="p-6 bg-white bg-opacity-45 shadow-lg rounded-xl h-[400px] border-y-4  border-black">
          <h2 className="text-xl font-bold mb-4 text-black">
            Orders Distribution
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={orderData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="p-6 bg-white bg-opacity-45 shadow-lg rounded-xl h-[400px] border-y-4  border-black">
          <h2 className="text-xl font-bold mb-2 text-black">
            Order Status Breakdown
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={orderData}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#82ca9d"
                label
              >
                {orderData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;
