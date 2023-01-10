import React from "react";
import { db } from "../components/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import { setCurrentUser } from "../redux/user";
import { setChats } from "../redux/user";
import { useDispatch } from "react-redux";
import { setMountChats } from "../redux/home";
import { setActive } from "../redux/user";
import { useSelector } from "react-redux";
const useConsistentCurrentUserDataFetch = ({ currentUser }) => {
  // const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch;
  const colRef = collection(db, "users");
  const q = query(colRef);
  onSnapshot(q, () => {
    const docRef = doc(db, "users", currentUser.uid);
    getDoc(docRef).then((res) => {
      console.log("reupdated");
      dispatch(setCurrentUser({ currentUser: res.data() }));
      // console.log(res.data());
      dispatch(setChats({ chats: res.data().chats }));

      dispatch(setMountChats({ mountChats: true }));
      dispatch(setActive({ isActive: true }));
    });
    // });
  });
};

export default useConsistentCurrentUserDataFetch;