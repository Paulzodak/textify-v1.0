import React from "react";
import { useState, useEffect } from "react";
import { doc, getDo, collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../components/firebase";
const useFetchActive = (uid) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const colRef = collection(db, "users");
    const q = query(colRef);
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((user) => {
        if (user.data().uid === uid) {
          setData(user.data().isActive);
        }
      });
    });
  }, []);
  return [data];
};

export default useFetchActive;
