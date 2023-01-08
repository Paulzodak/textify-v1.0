import React from "react";
import { db } from "../components/firebase";
import { doc, getDo, collection, query, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
const useFetchisTyping = (currentUserUid, userUid) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const colRef = collection(db, "users");
    const q = query(colRef);
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((user) => {
        if (user.data().uid === currentUserUid) {
          user.data().chats.map((item) => {
            if (item.uid === userUid) {
              setData(item.isTyping);
            }
          });
        }
      });
    });
  }, []);
  return [data];
};

export default useFetchisTyping;
