import About_us from "./Web/About_us";
import Contact_us from "./Web/Contact_us";
import Homepage from "./Web/Homepage";
import Navbar from "./Web/Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <Homepage />
      <About_us />
      <Contact_us />
    </>
  );
}

export default Layout;
