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
import { useEffect } from "react";
import Swal from "sweetalert2";
import { Toast } from "../UI/signLoginGlobal";

const useConsistentCurrentUserDataFetch = (currentUser) => {
  const dispatch = useDispatch();
  const { mainGreen } = useSelector((state) => state.styles.colors);
  // console.log(currentUser);

  useEffect(() => {
    const colRef = collection(db, "users");
    const q = query(colRef);
    const unsubscribe = () =>
      currentUser &&
      onSnapshot(q, () => {
        const docRef = doc(db, "users", currentUser.uid);
        getDoc(docRef)
          .then((res) => {
            console.log("reupdated");
            dispatch(setCurrentUser({ currentUser: res.data() }));
            // console.log(res.data());
            dispatch(setChats({ chats: res.data().chats }));
            // dispatch(setMountChats({ mountChats: true }));
            // dispatch(setActive({ isActive: true }));
          })
          .catch((res) => {
            Toast.fire({
              title: "Error!",
              text: res.message,
              icon: "error",
              confirmButtonText: "Okay",
              confirmButtonColor: mainGreen,
            });
          });
      });
    unsubscribe();
    return () => {
      // console.log("unsubcribed useConsistentCurrentUserDataFetch");
      unsubscribe();
    };
  }, []);
};

export default useConsistentCurrentUserDataFetch;
