import React from "react";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { db } from "../components/firebase";
import { setChats, setActive } from "../redux/user";
import { setChatItemData } from "../redux/people";
const useConsistentlyFetchChatItemData = (chatItemData, currentUser) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const colRef = collection(db, "users");
    const q = query(colRef);
    const unsubscribe = () => {
      // chatItemData.uid &&
      onSnapshot(q, () => {
        const ref = doc(db, "users", currentUser.uid);
        getDoc(ref).then((res) => {
          console.log(res.data());
          res.data().chats.map((chat) => {
            if (chat.username === chatItemData.username) {
              dispatch(setChatItemData({ chatItemData: chat }));
            }
          });
        });
      });
    };
    unsubscribe();
    return () => unsubscribe();
  }, []);
};

export default useConsistentlyFetchChatItemData;
