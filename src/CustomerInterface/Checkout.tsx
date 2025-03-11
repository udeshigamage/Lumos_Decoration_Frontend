import { useEffect, useState } from "react";

import { Form, useNavigate } from "react-router-dom";
import pic09 from "../assets/pic56.jpg";

import CommonLoading from "../Util/Commonloading";
import Deleteconfirmation from "../Util/Deleteconfirmation";
import { toast } from "react-toastify";
import { Formik } from "formik";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
interface CartItem {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  discount: number;
  total_price: number;
  product_image?: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const [cartitems, setcartitems] = useState<CartItem[]>([]);
  const [isloading, setisloading] = useState(false);
  const [isconfirmationopen, setisconfirmationopen] = useState(false);
  const [productid, setproductid] = useState("");
  const handleclose = async () => {
    setisconfirmationopen(false);
  };
  const handledelete_ = async (item: any) => {
    setisconfirmationopen(true);
    setproductid(item);
  };
  const getCartItems = () => {
    setisloading(true);
    try {
      const cart = localStorage.getItem("cartItems");
      console.log("Retrieved cart:", cart);
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error("Error retrieving cart items:", error);
      return [];
    } finally {
      setTimeout(() => {
        setisloading(false);
      }, 1000);
    }
  };

  const handledelete = async () => {
    setisloading(true);
    try {
      const cart = await localStorage.getItem("cartItems");
      let parsedCart: CartItem[] = cart ? JSON.parse(cart) : [];

      // Filter out the item with the matching product_id
      const updatedCart = parsedCart.filter(
        (item) => item.product_id !== productid
      );
      toast.success("deleted succcessfully");
      // Save the updated cart back to localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));

      // Update the state to re-render the component
      setcartitems(updatedCart);
    } catch (error) {
      toast.error("Error deleting cart item:");
    } finally {
      setTimeout(() => {
        setisloading(false);
      }, 1000);
      setisconfirmationopen(false);
    }
  };

  useEffect(() => {
    // Retrieve cart items when component mounts
    setcartitems(getCartItems());
  }, []);

  // Calculate total cart value
  const calculateTotal = () => {
    return cartitems
      .reduce((total, item) => total + item.total_price, 0)
      .toFixed(2);
  };
  const calculateAllowance = () => {
    let Total = Number(calculateTotal());
    return Total * 0.2;
  };

  return (
    <div
      className="h-screen"
      style={{
        backgroundImage: `url(${pic09})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "calc(100vh - 48px)",
      }}
    >
      <div className="flex flex-row justify justify-between bg-red-950 w-full mb-5">
        <div className="flex flex-row position-relative">
          <h1 className="text-4xl font-serif text-white bg-gray-500 bg-opacity-50 animate-pulse m-3 hover:bg-white hover:text-black p-1 rounded-lg hover:bg-red-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
              />
            </svg>
          </h1>
          <h1 className="font-serif text-2xl font-bold text-white p-2 mt-2">
            My Cart
          </h1>
        </div>
        <button
          className="btn btn-danger text-lg bg-white bg-opacity-25 p-2 m-2 text-black font-serif hover:bg-white hover:text-black rounded-lg animate-pulse"
          onClick={() => {
            navigate("/customer/mycart/checkout");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-col ">
        <div className="flex flex-row m-5 gap-2">
          <div className="basis-1/2">
            <h1 className="text-black font-bold text-3xl mb-2">Cart items</h1>
            <table
              className="table border-white bg-red-100 opacity-90 text-black font-sans font-bold w-3/4 border-black border-2"
              style={{
                backgroundImage: `url(${pic09})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <thead className="text-black text-2xl">
                <tr>
                  {/* <th>Product ID</th> */}
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Discount</th>
                  <th>Total Price</th>
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              <tbody className="text-xl">
                {cartitems.length > 0 ? (
                  cartitems.map((item) => (
                    <tr key={item.product_id}>
                      {/* <td>{item.product_id ?? "-"}</td> */}
                      <td>{item.product_name ?? "-"}</td>
                      <td>{item.price.toFixed(2)} LKR</td>
                      <td>{item.quantity ?? "-"}</td>
                      <td>{item.discount}%</td>
                      <td>{item.total_price.toFixed(2)} LKR</td>
                      {/* <td className="flex flex-row gap-2">
                        <button
                          className="btn btn-danger bg-red-950"
                          onClick={() => handledelete_(item.product_id)}
                        >
                          <MdDelete size={20} color="white" />
                        </button>
                      </td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>
                      <div className="py-5 text-center">
                        <div className="fw-semibold fs-3 text-gray-400">
                          No items in cart
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {cartitems.length > 0 && (
              <div className=" flex flex-col justify-center items-center mt-10  p-4 rounded-lg">
                <h2 className="text-2xl bg-red-400 p-2 w-1/2 rounded-lg font-bold text-black">
                  Total Cart Value: {calculateTotal()} LKR Allowance:{" "}
                  {calculateAllowance()} LKR
                </h2>
                <p className="text-red-700 mt-5">
                  Allowance need to pay after confirming the order
                  <span className="text-red-700">!</span>
                </p>
              </div>
            )}
          </div>
          <div className="basis-1/2 bg-white bg-opacity-40 rounded-xl p-5">
            <Formik
              initialValues={{
                description: "",
                delivery_date: "",
                added_date: "",
              }}
              onSubmit={(values, resetForm) => {
                setisloading(true);
                try {
                  axios.post(`${API_URL}/Order`, {
                    Customer_ID: 1,
                    orderitems: cartitems.map((item) => ({
                      Product_ID: item.product_id,
                      quantity: item.quantity,
                    })),
                    order: {
                      Order_ID: 0, // Backend might generate this
                      Order_description: values.description || "No description",
                      Order_deadlinedate: values.delivery_date,
                      Order_allowance: 0, // Adjust as needed
                      Order_payment_status: false, // Assuming unpaid initially
                      Order_allowance_status: false, // Adjust as needed
                      Order_status: "Pending",
                      TotalCost: 0, // Adjust if needed
                    },
                  });
                } catch (error) {
                } finally {
                  setTimeout(() => {
                    setisloading(false);
                  }, 1000);
                }
              }}
            >
              {({ values, getFieldProps, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                    <div className="flex flex-row justify-start items-center">
                      <h1 className="text-black font-bold text-3xl mb-2">
                        Order Details
                      </h1>
                    </div>

                    <div className="flex flex-row ">
                      <div className="basis-1/2 flex flex-col">
                        <label className="text-black text-xl">Added Date</label>
                        <input
                          type="date"
                          placeholder="Added date"
                          className="input input-bordered w-full max-w-xs "
                          defaultValue={new Date().toISOString().split("T")[0]}
                          disabled
                        />
                      </div>
                      <div className="basis-1/2 flex flex-col">
                        <label className="text-black text-xl">
                          Delivery Date
                        </label>
                        <input
                          type="date"
                          placeholder="Delivery date"
                          className="input input-bordered w-full max-w-xs"
                          {...getFieldProps("delivery_date")}
                        />
                      </div>
                    </div>

                    <textarea
                      placeholder="Description"
                      rows={3}
                      cols={25}
                      className="w-[600px] my-5 p-2 border-2 border-black rounded-lg"
                      {...getFieldProps("description")}
                    />
                    {/* <textarea
                   placeholder="Note"
                   rows={3}
                   cols={25}
                   className="w-[600px] my-5 p-2 border-2 border-black rounded-lg"
                   {...getFieldProps("note")}
                 /> */}
                    {/* <label className="text-black text-xl">
                   Upload any documents related to order
                 </label>
                 <input
                   type="file"
                   className="w-[300px] my-5 p-2 border-2 bg-black border-black rounded-lg"
                   {...getFieldProps("file")}
                 /> */}
                    <div className="flex flex-row justify-center">
                      <button
                        className="bg-red-950 text-white font-bold py-4 px-8 mr-5 rounded-lg border-white border-4"
                        type="submit"
                      >
                        Place order
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      {isconfirmationopen && (
        <Deleteconfirmation
          handledelete={handledelete}
          setmodelclose={handleclose}
        />
      )}
      {isloading && <CommonLoading />}
    </div>
  );
};

export default Checkout;
