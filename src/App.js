import Login from "./pages/Login";
import "./App.css";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import Register from "./pages/Register";
import { auth } from "./components/firebase";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Textify from "./components/LoadingTheme/Textify";
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
