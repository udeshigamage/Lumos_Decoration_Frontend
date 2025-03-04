import { useEffect, useState } from "react";
import mycartp from "../assets/pic22.jpg";
import { useNavigate } from "react-router-dom";

const Mycart = () => {
  const navigate = useNavigate();
  const [cartitems, setcartitems] = useState([]);
  const getCartItems = () => {
    const cart = localStorage.getItem("Cartitem");
    console.log(cart);
    return cart ? JSON.parse(cart) : [];
  };
  const handledelete = (id: any) => {
    const cart = localStorage.getItem("Cartitem");
    let parsedCart = cart ? JSON.parse(cart) : [];
    const updatedCart = parsedCart.filter((item: any) => item.id !== id);
    localStorage.setItem("Cartitem", JSON.stringify(updatedCart));
    setcartitems(updatedCart);
  };
  useEffect(() => {
    setcartitems(getCartItems());
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url(${mycartp})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-row justify justify-between bg-red-950 w-full mb-5">
        <div className="flex flex-row position-relative">
          <h1 className="text-4xl font-serif text-white bg-gray-500 bg-opacity-50  animate-pulse m-3 hover:bg-white hover:text-black  p-1 rounded-lg hover:bg-red-300">
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
          <h1 className="font-serif text-2xl font-bold text-white p-2 mt-2   ">
            My cart
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

      <div className="flex flex-col justify-center items-center ">
        <table className="table border-white bg-red-100 opacity-90 text-black font-serif w-3/4">
          {/* head */}
          <thead className="text-black text-xl">
            <tr>
              <th>Product Id</th>
              <th>Category</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartitems.length > 0 ? (
              cartitems.map((item: any, index: any) => (
                <tr key={item.product_id}>
                  <td>{item.product_id ?? "-"}</td>
                  <td>{item.product_name ?? "-"}</td>
                  <td>{item.price ?? "-"}</td>
                  <td>{item.quantity ?? "-"}</td>
                  <td>{item.discount ?? "-"}</td>
                  <td>{item.total_price ?? "-"}</td>
                  <td className="flex flex-row gap-2">
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handledelete(item.product_id); // delete using product_id
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className="py-5 text-center">
                    <img src="/media/other/nodata.png" alt="No data" />
                    <div className="fw-semibold fs-3 text-gray-400">
                      No matching records found
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Mycart;
