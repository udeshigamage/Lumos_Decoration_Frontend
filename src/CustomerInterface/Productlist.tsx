import Navbarcustomer from "./Navbarcustomer";
import pico9 from "../assets/pic56.jpg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "./Style/swiperStyles.css";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";
import { toast } from "react-toastify";
import CommonLoading from "../Util/Commonloading";
import { IoMdCloseCircle } from "react-icons/io";
import pico23 from "../assets/pico36.jpg";
import pic045 from "../assets/pic56.jpg";

const API_URL = import.meta.env.VITE_API_URL;

// Utility function to safely manage localStorage
const useLocalStorage = () => {
  const getCartItems = () => {
    try {
      const items = localStorage.getItem("cartItems");
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error("Error reading cart items:", error);
      return [];
    }
  };

  const setCartItems = (items: any[]) => {
    try {
      // Limit the number of items or reduce item size if needed
      const limitedItems = items.slice(0, 50); // Limit to 50 items

      // Optional: Remove large image data if cart is getting too big
      const compressedItems = limitedItems.map((item) => ({
        ...item,
        product_image: "", // Remove image data to save space
      }));

      localStorage.setItem("cartItems", JSON.stringify(compressedItems));
      return true;
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "QuotaExceededError"
      ) {
        // Handle quota exceeded error
        toast.error("Cart storage is full. Please clear some items.");

        // Optional: Clear existing cart
        localStorage.removeItem("cartItems");
      } else {
        console.error("Error setting cart items:", error);
      }
      return false;
    }
  };

  return { getCartItems, setCartItems };
};

const Productlist = () => {
  const params = useParams();
  const { getCartItems, setCartItems } = useLocalStorage();

  const [categories, setCategories] = useState<any[]>([]);
  const [isloading, setisloading] = useState(false);
  const [ismodelopen, setismodelopen] = useState(false);
  const [selectedproduct, setselectedproduct] = useState<any>(null);
  const [quantity, setquantity] = useState(1);

  const fetchCategoryList = async () => {
    setisloading(true);
    try {
      const response = await axios.get(
        `${API_URL}/product/productalllist/list/${params.id}`
      );
      await setCategories(response.data);
    } catch (error) {
      toast.error("Error fetching products");
    } finally {
      setTimeout(() => {
        setisloading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  const handlemodelopen = (item: any) => {
    setismodelopen(true);
    setselectedproduct(item);
  };

  const handleaddtocart = () => {
    // Retrieve existing cart items
    const existingCartItems = getCartItems();

    // Calculate discounted price
    const discountedPrice =
      selectedproduct?.Product_price -
      (selectedproduct?.Product_price * selectedproduct?.Product_discount) /
        100;

    // Create new cart item
    const newCartItem = {
      product_id: selectedproduct?.Product_Id,
      quantity: quantity,
      product_name: selectedproduct?.Product_name,
      original_price: selectedproduct?.Product_price,
      price: discountedPrice,
      discount: selectedproduct?.Product_discount,
      total_price: quantity * discountedPrice,
      // Optionally reduce image size or remove to save space
    };

    // Check if product already exists in cart
    const existingProductIndex = existingCartItems.findIndex(
      (item: any) => item.product_id === newCartItem.product_id
    );

    if (existingProductIndex > -1) {
      // Update quantity if product exists
      existingCartItems[existingProductIndex].quantity += quantity;
      existingCartItems[existingProductIndex].total_price =
        existingCartItems[existingProductIndex].quantity * discountedPrice;
    } else {
      // Add new product to cart
      existingCartItems.push(newCartItem);
    }

    // Attempt to save to localStorage with error handling
    if (setCartItems(existingCartItems)) {
      toast.success(`${newCartItem.product_name} added to cart!`);
      handlemodelclose();
    } else {
      toast.error("Failed to add item to cart. Storage is full.");
    }
  };

  const handlemodelclose = () => {
    setismodelopen(false);
    setselectedproduct(null);
    setquantity(1);
  };
  return (
    <div>
      <Navbarcustomer />
      <div
        className="bg-white min-h-screen"
        style={{
          backgroundImage: `url(${pico9})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "calc(100vh - 48px)",
        }}
      >
        <div className="flex flex-col w-full min-w-full">
          <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-serif font-bold text-red-950">
              Our Products
            </h1>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={25}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              breakpoints={{
                1024: { slidesPerView: 3 },
                768: { slidesPerView: 2 },
                640: { slidesPerView: 1 },
              }}
              className="p-5 w-full max-w-7xl"
            >
              {categories.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="card card-compact bg-white text-black w-70 h-[400px] shadow-xl ">
                    <figure className="h-[200px] w-full">
                      <img
                        src={item?.Product_image}
                        alt={item.Product_name}
                        className="h-full w-full object-cover"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{item.Product_name}</h2>
                      <p className="text-black font-bold ">
                        {item.Product_price}
                        {" LKR"}
                      </p>
                      <p className="text-red-600 font-semibold">
                        {item?.Product_discount == 0
                          ? "No Discount Available"
                          : `${item?.Product_discount}% Discount Available`}
                      </p>
                      {item?.Product_discount !== 0 && (
                        <p className=" bg-red-400 text-black font-bold w-1/2 p-2 rounded-lg">
                          Last price :{" "}
                          {item?.Product_price -
                            (item?.Product_price * item?.Product_discount) /
                              100}
                        </p>
                      )}
                      <div className="card-actions justify-end">
                        <button
                          className="btn btn-primary bg-black text-white hover:bg-gray-800"
                          onClick={() => handlemodelopen(item)}
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {ismodelopen && (
              <div className="fixed inset-0 flex justify-center items-center z-50 ">
                <div
                  className="w-[600px] h-[500px] bg-red-200 rounded-lg  shadow-2xl shadow-zinc-500 border-black border-4 "
                  style={{
                    backgroundImage: `url(${pic045})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "500px",
                  }}
                >
                  <div className="flex flex-col">
                    <div className="flex flex-row justify-end items-center ">
                      <IoMdCloseCircle
                        size={30}
                        color="black"
                        className="m-2"
                        onClick={() => {
                          setismodelopen(false);
                        }}
                      />
                    </div>
                    <div className="flex flex-row justify-center items-center m-2 ">
                      <h1 className="text-slate-900 text-3xl font-bold font-serif ">
                        Product details
                      </h1>
                    </div>

                    <div className="flex flex-row ">
                      <div className="basis-1/2 flex justify-center items-start mt-5 ">
                        <label
                          htmlFor="file-upload"
                          className="relative w-48 h-48 rounded-full border-2 border-black flex items-center justify-center cursor-pointer overflow-hidden"
                        >
                          <img
                            src={selectedproduct?.Product_image}
                            alt="Current"
                            className="w-full h-full object-cover rounded-full"
                          />
                        </label>
                      </div>
                      <div className="basis-1/2">
                        <div className="flex flex-col">
                          <div className="flex flex-row position-relative gap-2 text-black my-3">
                            <label className="text-xl font-serif font-bold  ">
                              {selectedproduct?.Product_name}
                            </label>
                          </div>
                          <div className="flex flex-row position-relative gap-2 text-black ">
                            <label className="text-xl font-serif font-bold">
                              {selectedproduct?.Product_price}
                              {" LKR"}
                            </label>
                          </div>
                          <div className="flex flex-row position-relative gap-2 text-black my-3">
                            <label className="text-xl text-red-600 font-serif font-bold">
                              {selectedproduct?.Product_discount}{" "}
                              {" % Discount Available"}
                            </label>
                          </div>
                          <div className="flex flex-row position-relative gap-2 text-white bg-red-600 w-2/3 p-2 rounded-lg ">
                            <label className="text-xl font-serif font-bold">
                              Last price
                            </label>
                            <p className="text-white mb-3">
                              {selectedproduct?.Product_price -
                                (selectedproduct?.Product_price *
                                  selectedproduct?.Product_discount) /
                                  100}
                              {" LKR"}
                            </p>
                          </div>
                          <label className="text-xl font-serif text-black font-bold mt-2">
                            Add the quantity below
                          </label>
                          <div className="flex flex-row position-relative gap-2 text-black my-3">
                            <input
                              type="number"
                              placeholder="Quantity"
                              value={quantity}
                              min={1}
                              className="text-white w-[200px] p-2 rounded-lg  h-[50px]"
                              onChange={(e) =>
                                setquantity(Number(e.target.value))
                              }
                            />
                          </div>
                          <div className="flex flex-row  justify-end m-5">
                            <button
                              className="bg-black text-white px-7 py-4 rounded-lg border-white border-4"
                              onClick={() => {
                                handleaddtocart();
                              }}
                            >
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isloading && <CommonLoading />}
    </div>
  );
};

export default Productlist;
