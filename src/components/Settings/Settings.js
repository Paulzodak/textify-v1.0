import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setActive } from "../../redux/user";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const signout = async () => {
    navigate("/");
    // SETS ACTIVE TO FALSE IN DB
    // dispatch(setActive({ isActive: false }));
    // const docRef = doc(db, "users", currentUser.uid);
    // const data = { isActive: false };
    // updateDoc(docRef, data);

    await signOut(auth);
  };
  return (
    <div>
      <button key="btn" onClick={signout}>
        signOut
      </button>
    </div>
  );
};

export default Settings;
