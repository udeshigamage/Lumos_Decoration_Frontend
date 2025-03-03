import Navbarcustomer from "./Navbarcustomer";

import pico5 from "../assets/pic05.jpg";
import pico3 from "../assets/flower_1.jpg";
import pico2 from "../assets/pico21.jpg";
import pico1 from "../assets/pico2.jpg";
import pico9 from "../assets/pic56.jpg";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbarcustomer />
      <div
        className="bg-white min-h-screen  "
        style={{
          backgroundImage: `url(${pico9})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "calc(100vh - 48px)",
        }}
      >
        <div className="flex flex-col w-full min-w-full">
          <div className="flex  flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-serif font-bold text-red-950">
              Our Categories
            </h1>
            <div className="flex flex-row items-center gap-5 overflow-x-scroll p-5">
              {[
                {
                  title: "Garlands",
                  description:
                    "We are creating different type of garlends using different flowers",
                  img: pico5,
                },
                {
                  title: "Flower Bouquets",
                  description:
                    "we are creating different type of flower bouquets",
                  img: pico3,
                },
                {
                  title: "Candle Decorations",
                  description:
                    "we are creating different type of candle decorations",
                  img: pico2,
                },
                {
                  title: "Custom Decorations",
                  description:
                    " we are creating different type of custom decorations",
                  img: pico1,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="card card-compact bg-white text-black w-80 h-[400px] shadow-xl"
                  onClick={() =>
                    navigate(
                      `/customer/category/${item.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`
                    )
                  }
                >
                  <figure className="h-[200px] w-full">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{item.title}</h2>
                    <p>{item.description}</p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary bg-black text-white hover:bg-gray-800 animate-pulse">
                        Read more
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
