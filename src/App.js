import Login from "./pages/Login";
import "./App.css";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "./components/firebase";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
