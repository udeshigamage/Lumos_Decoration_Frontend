import { ToastContainer } from "react-toastify";
import PrivateRoutes from "./routing/privateRoutes";
import Approutes from "./routing/Approutes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      {" "}
      {/* Only add BrowserRouter here */}
      <Approutes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
