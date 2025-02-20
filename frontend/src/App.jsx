import { Navbar } from "./components/Navbar";
import { LandingPage } from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { EmailVerify } from "./pages/EmailVerify";
import { Notes } from "./pages/NotesPage";
import { useState } from "react";
import {UserContext} from "./context/UserContext"
import io from "socket.io-client";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const socket = io.connect("http://localhost:8000");

  return (
    <>
    <UserContext.Provider value={{ isLogin, setIsLogin }}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/SignUp" element={<SignUp />}/>
        <Route path="/EmailVerify/:token" element={<EmailVerify />}/>
        <Route path="/Notes" element={<Notes />}/>
      </Routes> 
    </UserContext.Provider>
    </>
  )
}