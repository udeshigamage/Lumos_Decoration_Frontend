import About_us from "./Web/About_us";
import Contact_us from "./Web/Contact_us";
import Footer from "./Web/Footer";
import Homepage from "./Web/Homepage";
import Navbar from "./Web/Navbar";
import Services from "./Web/Services";

function Layout() {
  return (
    <>
      <Navbar />
      <Homepage />
      <Services />
      <About_us />
      <Contact_us />
      <Footer />
    </>
  );
}

export default Layout;
