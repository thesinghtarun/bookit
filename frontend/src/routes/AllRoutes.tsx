import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import Home from "../components/Home";
import ViewDetail from "../components/helper/ViewDetail";
import LandingPage from "../components/LandingPage";
import React from "react";

const AllRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/view/:id" element={<ViewDetail />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default AllRoutes;
