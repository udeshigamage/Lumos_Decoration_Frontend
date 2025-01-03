import React from "react";
import pic0567 from "../assets/pic0567.jpg";

const Homepage = () => {
  return (
    <div>
      <div
        id="home"
        style={{
          backgroundImage: `url(${pic0567})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "calc(100vh - 48px)",
        }}
      >
        <p>hi</p>

        {/* Separate Box */}
        <div
          className="bg-yellow-100"
          style={{
            width: "600px", // Box width
            height: "200px", // Box height
            // Semi-transparent background
            color: "white", // Text color
            display: "flex", // Flexbox to align content inside the box
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
            position: "absolute", // Absolute positioning
            top: "50%", // Move to the center vertically
            left: "50%", // Move to the center horizontally
            transform: "translate(-50%, -50%)", // Adjust position to truly center it
            borderRadius: "8px", // Rounded corners
            opacity: 0.8,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#FFC724",
          }}
        >
          <p className="font-sans text-black px-3 text-xl font-semibold">
            Welcome to Lumos Decorations, your go-to destination for exquisite
            handcrafted decorations and personalized gifts. Nestled in the heart
            of Jaffna, we take pride in crafting unique and personalized gifts
            that reflect your unique style and personality.
          </p>

          {/* <button className="btn btn-primary ">Book now</button> */}
        </div>
        <div className="flex align-bottom items-end mt-4">
          <div className="animate-bounce bg-blue-500 p-3 rounded-full">
            <svg
              className="w-6 h-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
