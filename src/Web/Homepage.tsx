import pic0567 from "../assets/pico14.jpg";

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
        {/* Separate Box */}

        <div
          className="min-h-screen"
          style={{
            width: "900px", // Box width
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
            // Rounded corners
            opacity: 5.0,
          }}
        >
          <div className="flex flex-col">
            <h1 className="font-serif text-black px-3 text-6xl    ">
              {" "}
              <span className="text-red-700">W</span>elcome{" "}
              <span className="text-red-700">t</span>o{" "}
              <span className="text-red-700">L</span>umos{" "}
              <span className="text-red-700">D</span>ecorations
            </h1>

            <br />
            <p className="font-sans text-black font-semibold text-xl font-medium mt-4 opacity-80 bg-gradient-to-r from-amber-100 to-red-200 p-10 rounded-lg shadow-2xl text-black ">
              Your go-to destination for exquisite handcrafted decorations and
              personalized gifts Nestled in the heart of Jaffna, we take pride
              in crafting unique and personalized gifts that reflect your unique
              style and personality.
              <br />
            </p>
            <div className="flex justify-center">
              <button className="btn btn-primary my-10 w-[200px] bg-red-950 hover:bg-slate-700 animate-pulse">
                <a href="/login">
                  <span className="text-white font-serif text-lg">
                    Book now {">>"}
                  </span>
                </a>
              </button>
            </div>
          </div>

          {/* <button className="btn btn-primary ">Book now</button> */}
        </div>
        {/* <div className="flex align-bottom items-end mt-4">
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
        </div> */}
      </div>
    </div>
  );
};

export default Homepage;
