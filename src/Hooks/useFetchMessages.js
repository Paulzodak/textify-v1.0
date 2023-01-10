import React from "react";
import { db } from "../components/firebase";
import { doc, getDoc, onSnapshot, query, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { setMessages } from "../redux/user";
import { useDispatch } from "react-redux";
const useFetchMessages = (currentUserUid, userUid) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  // console.log(currentUserUid);
  // console.log(userUid);
  useEffect(() => {
    const colRef = collection(db, "users");
    const q = query(colRef);
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((user) => {
        // console.log(user.data());
        if (user.data().uid === currentUserUid) {
          user.data().chats.map((item) => {
            if (item.uid === userUid) {
              // console.log(item.messages);
              dispatch(setMessages({ messages: item.messages }));
            }
          });
        }
      });
    });
  }, []);
};

export default useFetchMessages;
