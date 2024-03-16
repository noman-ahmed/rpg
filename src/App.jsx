import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer/Footer.jsx";
import Home from "./pages";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import ChatRoom from "./pages/chatroom.jsx";
import Box from "@mui/material/Box";
import Battle from "./pages/Battle.jsx";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Box>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chatroom" element={<ChatRoom />} />
            <Route path="/battle" element={<Battle />} />
          </Routes>
        </Box>
        <Footer />
      </Router>
    </>
  );
}

export default App;
