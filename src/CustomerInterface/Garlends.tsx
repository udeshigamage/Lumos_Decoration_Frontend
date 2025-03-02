import { useEffect, useState } from "react";
import pico5 from "../assets/pic05.jpg";
import { useNavigate } from "react-router-dom";

import Cartmodel from "./Cartmodel";

const Garlends = () => {
  const navigate = useNavigate();
  const [cartitems, setcartitems] = useState([]);
  const [addedItems, setAddedItems] = useState<{ [key: string]: boolean }>({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [ismodelopen, setmodelopen] = useState<boolean>(false);
  const garlands = [
    {
      id: 1,
      name: "Rose Garland",
      price: 1000,
      url: { pico5 },
      discount: "10%",
      category: "Flower Garland",
    },
    {
      id: 3,
      name: "Lotus Garland",
      price: 1200,
      url: { pico5 },
      discount: "10%",
      category: "Flower Garland",
    },
    {
      id: 2,
      name: "Jasmine Garland",
      price: 800,
      url: { pico5 },
      discount: "10%",
      category: "Flower Garland",
    },
    {
      id: 4,
      name: "Araliya Garland",
      price: 900,
      url: { pico5 },
      discount: "10%",
      category: "Flower Garland",
    },
    {
      id: 5,
      name: "Blossom Garland",
      price: 700,
      url: { pico5 },
      discount: "10%",
      category: "Flower Garland",
    },
    {
      id: 6,
      name: "Dahaspetiya Garland",
      price: 450,
      url: { pico5 },
      discount: "10%",
      category: "Flower Garland",
    },
    {
      id: 7,
      name: "hibiscus Garland",
      price: 900,
      url: { pico5 },
      discount: "10%",
      category: "Flower Garland",
    },
    {
      id: 8,
      name: "wildjasmine Garland",
      price: 700,
      url: { pico5 },
      discount: "10%",
      category: "Flower Garland",
    },
    {
      id: 9,
      name: "bluelotus Garland",
      price: 450,
      url: { pico5 },
      discount: "10%",
      category: "Flower Garland",
    },
  ];
  const handleOpenModal = (product: any) => {
    console.log("products:", product);
    setSelectedProduct(product);
    console.log("clicked");
    console.log(product);
    setmodelopen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setmodelopen(false);
  };
  const Additem = (item: any) => {
    console.log("Trying to add item:", item);

    const cart = localStorage.getItem("cart");
    let parsedCart = cart ? JSON.parse(cart) : [];

    const quantity = quantities[item.id] || 1;

    const existingItemIndex = parsedCart.findIndex(
      (cartItem: any) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      parsedCart[existingItemIndex].quantity += quantity;
    } else {
      parsedCart.push({ ...item, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(parsedCart));
    console.log("Cart updated:", parsedCart);
    console.log("addedItems:", addedItems);

    // Update addedItems for the specific item
    setAddedItems((prev) => ({
      ...prev,
      [item.id]: true,
    }));

    // Reset quantity input
    setQuantities((prev) => ({
      ...prev,
      [item.id]: 0,
    }));

    // Remove "Already Added" message after 2 seconds for this item
    // setTimeout(() => {
    //   setAddedItems((prev) => ({
    //     ...prev,
    //     [item.id]: false,
    //   }));
    // }, 10000);
  };

  const handlequantity = (id: string, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value < 1 ? 1 : value, // Ensure quantity is at least 1
    }));
  };

  const getCartItems = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  };
  useEffect(() => {
    setcartitems(getCartItems());
  }, []);
  return (
    <div className="bg-gradient-to-r from-white to-red-100 min-h-screen">
      <div className="flex flex-row justify-between  bg-red-950 w-full p-2">
        <div>
          <div className="flex flex-row gap-2 ">
            <a href="/customer/services">
              <h1 className="text-4xl font-serif text-white bg-gray-500 bg-opacity-50  animate-pulse mt-2 hover:bg-white hover:text-black  p-1 rounded-lg hover:bg-red-300">
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
            </a>
            <h1 className="text-3xl font-serif text-white mt-2">Garlends</h1>
          </div>
        </div>
        <div>
          <button
            className="btn-primary text-black font-serif font-bold bg-white hover:bg-red-400 rounded-lg p-2 m-2"
            onClick={() => {
              navigate("/customer/mycart");

              console.log(cartitems);
            }}
          >
            My cart
          </button>
          <button
            className="btn-primary text-black font-serif font-bold bg-white hover:bg-red-400 rounded-lg p-2"
            onClick={() => navigate("/customer/orderhistory")}
          >
            Order History
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 p-5">
        {garlands.map((item, index) => (
          <div
            key={index}
            className="card bg-white text-black shadow-lg rounded-lg overflow-hidden"
          >
            <figure>
              <img
                src={pico5}
                alt="gralands"
                className="w-full h-20 object-cover"
              />
            </figure>
            <div className=" flex flex-col p-1 m-1">
              <h2 className=" rounded-lg p-1 font-serif text-black font-bold bg-amber-100">
                {item.name}
              </h2>
              <h2 className="text-red-600 text-sm font-bold font-serif text-lg">
                {"LKR " + item.price}
              </h2>
              <div className=" justify-between">
                {/* <h1 className="text-black font-bold font-serif text-lg">
                  Quantity
                </h1> */}
                {/* <input
                  type="number"
                  placeholder="0"
                  value={quantities[item.id]}
                  onChange={(e) => {
                    handlequantity(item.id, parseInt(e.target.value));
                  }}
                  className="bg-white text-black border-black border-2 w-20 rounded-lg p-2 font-serif"
                /> */}
              </div>
              <div className=" justify-between font-serif">
                <h1>
                  {" "}
                  <span className="text-red-600">{item.discount}</span> Discount
                  Available
                </h1>
              </div>
              <div className="card-actionsflex flex-row justify-end">
                <button
                  className="btn btn-sm w-15 bg-black text-white hover:bg-gray-600 font-serif"
                  onClick={() => {
                    //Additem(item);
                    handleOpenModal(item);
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
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
        {ismodelopen && selectedProduct && (
          <Cartmodel
            isopen={ismodelopen}
            isclose={handleCloseModal}
            products={selectedProduct}
          />
        )}
      </div>
    </div>
  );
};

export default Garlends;
