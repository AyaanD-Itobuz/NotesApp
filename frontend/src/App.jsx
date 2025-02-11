import { Navbar } from "./components/Navbar";
import { LandingPage } from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { EmailVerify } from "./pages/EmailVerify";
import { Notes } from "./pages/NotesPage";

export default function App() {
  return (
    <>
    <Navbar/>

    <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/Login" element={<Login />}/>
      <Route path="/SignUp" element={<SignUp />}/>
      <Route path="/EmailVerify/:token" element={<EmailVerify />}/>
      <Route path="/Notes" element={<Notes />}/>
    </Routes> 
    </>
  )
}