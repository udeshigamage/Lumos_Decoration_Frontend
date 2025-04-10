import { useEffect, useState } from "react";
import mycartp from "../assets/pic22.jpg";
import { useNavigate } from "react-router-dom";
import pic09 from "../assets/pic56.jpg";
import { MdDelete } from "react-icons/md";
import CommonLoading from "../Util/Commonloading";
import Deleteconfirmation from "../Util/Deleteconfirmation";
import { toast } from "react-toastify";

interface CartItem {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  discount: number;
  total_price: number;
  product_image?: string;
}

const Mycart = () => {
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
            navigate("/customer/services");
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

      <div className="flex flex-col justify-center items-center">
        <table
          className="table border-white bg-red-100 opacity-90 text-black font-sans font-bold w-3/4"
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
              <th>Action</th>
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
                  <td className="flex flex-row gap-2">
                    <button
                      className="btn btn-danger bg-red-950"
                      onClick={() => handledelete_(item.product_id)}
                    >
                      <MdDelete size={20} color="white" />
                    </button>
                  </td>
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
          <div className=" flex flex-col mt-10  p-4 rounded-lg">
            <h2 className="text-2xl bg-red-400 p-2 rounded-lg font-bold text-black">
              Total Cart Value: {calculateTotal()} LKR
            </h2>
            <div className="flex flex-row justify-center items-center">
              <button
                className="text-white text-3xl w-[50%] mt-5 py-3 bg-red-950 rounded-lg font-bold"
                onClick={() => navigate("/customer/services/checkout")}
              >
                Check out
              </button>
            </div>
          </div>
        )}
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

export default Mycart;
