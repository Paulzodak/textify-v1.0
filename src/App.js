import Login from "./pages/Login";
import "./App.css";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import Register from "./pages/Register";
import { auth } from "./components/firebase";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Textify from "./components/LoadingTheme/Textify";
import ChatIcon from "./images/svgs/ChatIcon";
import { FaUser } from "react-icons/fa";
import { BsFillChatLeftDotsFill as MessageIcon } from "react-icons/bs";
import { BsFillCameraVideoFill as VideoIcon } from "react-icons/bs";
import { BsPeople as PeopleIcon } from "react-icons/bs";
import { CiSettings as SettingsIcon } from "react-icons/ci";
import styled from "styled-components";
const P = styled.div`
  background-color: blue;
`;
function App() {
  const signOut = async () => {
    await signOut(auth);
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Load" element={<Textify />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
