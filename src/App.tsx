import { ToastContainer } from "react-toastify";
import PrivateRoutes from "./routing/privateRoutes";

function App() {
  return (
    <>
      <PrivateRoutes />
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
