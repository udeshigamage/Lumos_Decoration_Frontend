import React, { useEffect, useState } from "react";
import pic05 from "../assets/pic05.jpg";

type Props = {
  isopen: boolean;
  isclose: () => void;
  products: any;
};

const Cartmodel: React.FC<Props> = ({ isopen, isclose, products }) => {
  const [cartitems, setcartitems] = useState([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [addedItems, setAddedItems] = useState<{ [key: string]: boolean }>({});
  const Additem = (item: any) => {
    console.log("clicked me");
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
    isclose();
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
  if (!isopen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white p-6 rounded-lg shadow-lg border-b-orange-400 border-4">
        <div className="flex flex-row justify-end">
          <button onClick={isclose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-9 bg-black rounded-lg p-1 text-white mb-1"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-row gap-2">
          <div className="basis-1/4 w-full h-full bg-red">
            <img
              src={pic05}
              alt=""
              className=" object-cover w-72 h-72 rounded-md"
            />
            <h1 className="text-red-600 font-bold font-serif p-1 animate-pulse">
              click picture to Enlarge
            </h1>
          </div>
          <div className="basis-3/4 w-full text-black ">
            <div className="flex flex-col">
              <h1 className=" font-bold font-serif text-lg p-1 text-white bg-black rounded-lg">
                Product Id:{" "}
                <span className="text-white bg-black ">{products.id}</span>
              </h1>
              <div className="bg-amber-100 rounded-lg p-1 m-1 font-serif font-semibold">
                <h1 className=" font-bold font-serif text-lg text-red-800">
                  {products.name}
                </h1>
                <h1 className="text-black font-bold font-serif text-lg">
                  Quantity
                </h1>
                <input
                  type="number"
                  placeholder="0"
                  value={quantities[products.id]}
                  onChange={(e) => {
                    handlequantity(products.id, parseInt(e.target.value));
                  }}
                  className="bg-white text-black border-black border-2 w-20 rounded-lg p-2 font-serif"
                />
                <h1 className="">
                  Price <span>{products.price}</span>
                </h1>
                <h1>
                  Discount<span>{products.discount}</span>
                </h1>
              </div>
              <div className="bg-amber-200 rounded-lg p-1 m-1 w-full">
                <p className="font-serif">
                  A rose garland is a beautiful floral arrangement made by
                  stringing fresh or artificial roses together, often used for
                  decorations, weddings, religious ceremonies, and special
                  occasions. To care for a fresh rose garland, keep it in a cool
                  place away from direct sunlight and mist it lightly with water
                  to maintain freshness. If possible, store it in the
                  refrigerator to extend its lifespan. For artificial rose
                  garlands, simply dust them regularly and avoid exposure to
                  excessive moisture to keep them looking vibrant and elegant.
                  Proper care ensures that your rose garland remains fresh and
                  stunning for as long as possible.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between align-middle">
          <div className="bg-red-600 text-white p-1 font-serif text-lg rounded-lg justify-centers h-12">
            Total Amount{" "}
            {quantities[products.id] !== undefined && (
              <span>{products.price * quantities[products.id]}</span>
            )}
          </div>
          <div className="flex flex-row position-relative gap-2">
            <button
              onClick={isclose}
              className="mt-4 justify-end text-white bg-black p-3 rounded-lg"
            >
              Close
            </button>
            <button
              // onClick={isclose}
              className="mt-4 justify-end text-white bg-black p-3 rounded-lg"
              onClick={() => Additem(products)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartmodel;
