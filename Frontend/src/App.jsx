import React from "react";
import Router from "./Routes/Route";
import { ToastContainer, Bounce } from "react-toastify";

const App = () => {
  return (
    <>
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
};

export default App;
