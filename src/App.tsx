import { ToastContainer } from "react-toastify";
import PrivateRoutes from "./routing/privateRoutes";
import { Provider } from "react-redux";
import Store_ from "./reduxstore/Store_";

function App() {
  return (
    <>
      <Provider store={Store_}>
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
      </Provider>
    </>
  );
}

export default App;
