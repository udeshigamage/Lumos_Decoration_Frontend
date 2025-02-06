import { useEffect, useState } from "react";
import mycartp from "../assets/pic22.jpg";
import { useNavigate } from "react-router-dom";

const Mycart = () => {
  const navigate = useNavigate();
  const [cartitems, setcartitems] = useState([]);
  const getCartItems = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  };
  const handledelete = (id: any) => {
    const cart = localStorage.getItem("cart");
    let parsedCart = cart ? JSON.parse(cart) : [];
    const updatedCart = parsedCart.filter((item: any) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setcartitems(updatedCart);
  };
  useEffect(() => {
    setcartitems(getCartItems());
  }, []);
  const mycart = [
    {
      product_id: "01",
      category: "flowers boquets",
      item_name: "rose",
      quantity: 1,
      price: 1000,
      total: 1000,
    },
    {
      product_id: "01",
      category: "flowers boquets",
      item_name: "rose",
      quantity: 1,
      price: 1000,
      total: 1000,
    },
    {
      product_id: "01",
      category: "flowers boquets",
      item_name: "rose",
      quantity: 1,
      price: 1000,
      total: 1000,
    },
    {
      product_id: "01",
      category: "flowers boquets",
      item_name: "rose",
      quantity: 1,
      price: 1000,
      total: 1000,
    },
    {
      product_id: "01",
      category: "flowers boquets",
      item_name: "rose",
      quantity: 1,
      price: 1000,
      total: 1000,
    },
    {
      product_id: "01",
      category: "flowers boquets",
      item_name: "rose",
      quantity: 1,
      price: 1000,
      total: 1000,
    },
  ];
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
        <table className="table border-white bg-red-100 opacity-90 text-black  font-serif w-3/4 ">
          {/* head */}
          <thead className="text-black text-xl">
            <tr>
              {/* <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th> */}

              <th>Product Id</th>
              <th> Category</th>
              <th>Item name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartitems?.length > 0 ? (
              cartitems?.map((item: any, index: any) => (
                <tr>
                  <td>
                    <div className="d-flex justify-content-start flex-column">
                      <a className="text-black text-hover-primary fs-6">
                        {item?.id ?? "-"}
                      </a>
                    </div>
                  </td>

                  <td>
                    <div className="d-flex justify-content-start flex-column">
                      <a className="text-black text-hover-primary fs-6">
                        {item?.category ?? "-"}
                      </a>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-start flex-column">
                      <a className="text-black text-hover-primary ">
                        {item?.name ?? "-"}
                      </a>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-start flex-column">
                      <a className="text-black text-hover-primary fs-6 ">
                        {item?.quantity ?? "-"}
                      </a>
                    </div>
                  </td>
                  <td>
                    <a className=" text-hover-primary fs-6 px-5 py-5 rounded-md ">
                      {item?.price ?? "-"}
                    </a>
                  </td>
                  <td>
                    <a className=" text-hover-primary fs-6 px-5 py-5 rounded-md ">
                      {item.price * item.quantity}
                    </a>
                  </td>
                  <td className="flex flex-row position-relative gap-2">
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handledelete(item.id);
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
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                    <button className="btn btn-danger">
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
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className="py-5 d-flex flex-column align-content-center justify-content-center">
                    <div className="text-center">
                      <div className="symbol symbol-200px ">
                        <img src="/media/other/nodata.png" alt="" />
                      </div>
                    </div>
                    <div className="d-flex text-center w-100 align-content-center justify-content-center fw-semibold fs-3 text-gray-400">
                      No matching records found
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default Mycart;
