import pic08 from "../assets/pico20.jpg";

const Services = () => {
  return (
    <div className="bg-white p-5">
      <h1 className="font-serif text-black px-3 text-6xl mb-5">
        <span className="text-red-950">O</span>ur{" "}
        <span className="text-red-950">S</span>ervices
      </h1>
      <div id="services">
        <div className="carousel carousel-center rounded-box">
          <div className="carousel-item">
            <img src={pic08} alt="Pizza " className="max-h-screen w-10/12" />
          </div>
          <div className="carousel-item">
            <img src={pic08} alt="Pizza" className="max-h-screen w-10/12" />
          </div>
          <div className="carousel-item">
            <img src={pic08} alt="Pizza" className="max-h-screen w-10/12" />
          </div>
          <div className="carousel-item">
            <img src={pic08} alt="Pizza" className="max-h-screen w-10/12" />
          </div>
          <div className="carousel-item">
            <img src={pic08} alt="Pizza" className="max-h-screen w-10/12" />
          </div>
          <div className="carousel-item">
            <img src={pic08} alt="Pizza" className="max-h-screen w-10/12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
