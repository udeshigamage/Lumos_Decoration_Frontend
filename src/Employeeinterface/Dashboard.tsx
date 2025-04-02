import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import { toast } from "react-toastify";
import CommonLoading from "../Util/Commonloading";
import { useSelector } from "react-redux";
import { RootState } from "../reduxstore/Store_";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [Orders_employee, setOrders_employee] = useState<any>([]);
  const [isloading, setisloading] = useState(false);
  const [totalItems, settotalitems] = useState(0);
  const [totalpages, settotalpages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const pageSize = 5;
  const API_URL = import.meta.env.VITE_API_URL;
  const user = useSelector((state: RootState) => state.user.userData);

  const fetchcategories = async (page: number) => {
    setisloading(true);
    try {
      const Orders_employee_ = await axios.get(
        `${API_URL}/Employee/EmployeeOrders/${user?.User_ID}?page=${page}&pagesize=${pageSize}`
      );
      setOrders_employee(Orders_employee_.data.data);
      settotalitems(Orders_employee_.data.totalItems);
      settotalpages(Orders_employee_.data.totalPages);
      setCurrentPage(Orders_employee_.data.currentPage);
      setisloading(false);
      toast.success("Order data Fetched Successfully");
    } catch (error) {
      toast.error("Error Fetching Category");
    } finally {
      setisloading(false);
    }
  };
  const getStatusColor = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-500 text-white";
      case "denied":
        return "bg-red-500 text-white";
      case "confirmed":
        return "bg-blue-500 text-white";
      case "completed":
        return "bg-green-500 text-white";
      case "processing":
        return "bg-orange-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };
  useEffect(() => {
    fetchcategories(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalpages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-black font-serif">
        Orders Assigned
      </h1>
      <table className="min-w-full bg-white border border-gray-200 mt-5">
        <thead className="bg-gray-100">
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Order Date
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Order Description
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Items
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Total Cost
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Order Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Assigned Employee
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="">
          {Orders_employee.map((order: any) => (
            <tr key={order?.Order_ID} className="border-b">
              <td className="px-6 py-4 text-sm text-gray-700">
                {order.Order_ID}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {new Date(order.Order_date).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {order.Order_description || "No Description"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {order.OrderItems && order.OrderItems.length > 0
                  ? order.OrderItems.map((item: any, index: any) => (
                      <span key={index} className="block">
                        {item.ProductName} (Qty: {item.quantity})
                      </span>
                    ))
                  : "No Items"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {order.TotalCost || "Not Available"}
              </td>
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                    order?.Order_status
                  )}`}
                >
                  {order?.Order_status ?? "-"}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {order.Employee ? order.Employee.Name : "Not Assigned"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition hover:bg-blue-700"
                  onClick={() => {
                    navigate(`Viewemployeeorder/${order?.Order_ID}`, {
                      state: { Order: order },
                    });
                  }}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col items-end text-[#183642]  text-lg font-semibold font-mono">
        <div className="pagination ">
          <button
            className="btn m-2 bg-white text-[#183642] rounded-full p-2"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <TbPlayerTrackPrevFilled />
          </button>
          <span className="text-[#183642]  rounded-lg p-1">
            Page {currentPage} of {totalpages}: {totalItems}
          </span>
          <button
            className="btn mt-5 ml-5 bg-white text-[#183642] rounded-full p-2 "
            disabled={currentPage === totalpages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <TbPlayerTrackNextFilled />
          </button>
        </div>
      </div>
      {isloading && <CommonLoading />}
    </div>
  );
};

export default Dashboard;
