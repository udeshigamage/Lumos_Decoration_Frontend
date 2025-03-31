import Navbarcustomer from "./Navbarcustomer";
import pico9 from "../assets/pic56.jpg";
import { useNavigate } from "react-router-dom";
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

const API_URL = import.meta.env.VITE_API_URL;

const Services = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [isloading, setisloading] = useState(false);
  const fetchCategoryList = async () => {
    setisloading(true);
    try {
      const response =
        await axios.get(`${API_URL}/Category/listallcategories/list
`);
      setCategories(response.data);
    } catch (error) {
      toast.error("error");
    } finally {
      setTimeout(() => {
        setisloading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);
  const handleclick = (id: any) => {
    navigate(`categorylist/${id}`);
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
              Our Categories
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
                  <div
                    className="card card-compact bg-white text-black w-70 h-[400px] shadow-xl "
                    onClick={() =>
                      navigate(`categorylist/${item?.Category_Id}`)
                    }
                  >
                    <figure className="h-[200px] w-full">
                      <img
                        src={item?.Category_image}
                        alt={item.Category_name}
                        className="h-full w-full object-cover"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{item.Category_name}</h2>
                      <p>{item.Category_description}</p>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary bg-black text-white hover:bg-gray-800">
                          Read more
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      {isloading && <CommonLoading />}
    </div>
  );
};

export default Services;
