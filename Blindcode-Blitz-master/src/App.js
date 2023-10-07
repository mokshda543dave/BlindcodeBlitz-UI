// release v1.0 commit

import "./App.css";
import AdminRouteHandler from "./components/AdminRouteHandler";
import UserRouteHandller from "./components/UserRouteHandller";
import AdminDashboard from "./pages/admin/adm-dashboard";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home";
import { useState } from "react";
import { useEffect } from "react";
import { getPermissions } from "./services/permission-service";

function App() {
  // eslint-disable-next-line
  const [status, setStatus] = useState({
    LOGIN: "",
    SIGNUP: "",
  });
  useEffect(() => {
    getPermissions().then((data) => {
      setStatus({
        LOGIN: data[0].status,
        SIGNUP: data[1].status,
      });
      localStorage.removeItem("status");
      localStorage.setItem("status", JSON.stringify(data));
    });
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Register />} />
        <Route path="/admin/auth/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<UserRouteHandller />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/admin" element={<AdminRouteHandler />}>
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
