import React from "react";
import about_us from "../assets/about_us.jpg";

const About_us = () => {
  return (
    <div id="about_us">
      <div className=" w-screen h-screen">
        <div className="flex items-center justify-center h-screen rounded-lg">
          <div className="w-2/3 h-1/2 bg-white flex items-center justify-center rounded-lg">
            Centered Box
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
