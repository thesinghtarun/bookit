import React from "react";
import AllRoutes from "./routes/AllRoutes";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <>
      <AllRoutes />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
