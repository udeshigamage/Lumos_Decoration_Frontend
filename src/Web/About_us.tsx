import React from "react";
import about_us from "../assets/pico14.jpg";

const About_us = () => {
  return (
    <div
      id="about_us"
      className="bg-white"
      style={{
        backgroundImage: `url(${about_us})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "calc(100vh - 48px)",
      }}
    >
      <div className=" w-screen h-screen">
        <div className="flex flex-col items-center justify-center h-screen rounded-lg">
          <h1 className="font-serif text-black px-3 text-6xl mb-5">
            <span className="text-red-950">W</span>ho{" "}
            <span className="text-red-950">W</span>e
            <span className="text-red-950"> A</span>re
          </h1>
          <div className="w-2/3 h-1/2 bg-white flex  items-center justify-center rounded-lg  opacity-90">
            <p className="p-5 text-black text-lg font-serif">
              At Lumos Decorations, we are passionate about creating
              unforgettable experiences through beautiful, handcrafted
              decorations and personalized gifts. Based in the heart of Jaffna,
              our mission is to offer unique, high-quality products that bring
              joy and elegance to every occasion. Whether you're celebrating a
              wedding, birthday, or any special event, we take pride in
              designing decorations that reflect your personality and style. Our
              team of skilled artisans meticulously crafts each piece, ensuring
              every detail is perfect. We believe in the power of
              personalization, and our wide range of gifts and decorations can
              be customized to fit your specific needs. At Lumos Decorations, we
              don't just make decorations—we create lasting memories. Let us
              light up your special moments with the perfect touch of beauty and
              creativity
            </p>
          </div>
        </div>

        {/* <div className="flex flex-row items-start justify-center min-h-screen">
          <div className="px-5 py-5 self-center z-30">
            <h1 className="text-6xl text-white font-bold">About Us</h1>
            <p className="text-2xl text-white font-bold">
              Welcome to Lumos Decorations, your one-stop destination for
              exquisite floral arrangements and personalized gifts. We are a
              passionate team dedicated to creating stunning floral designs and
              personalized gifts that reflect your unique style and personality.
              With a commitment to quality and attention to detail, we strive to
              bring your vision to life, making every occasion special and
              memorable.
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default About_us;
