import React from "react";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../components/firebase";
import PropTypes from "prop-types";
const useUpdateisTyping = (currentUserUid, userUid, userInput) => {
  useEffect(() => {
    let tempChats = [];
    if (userInput.length > 0) {
      const docRef = doc(db, "users", userUid);
      getDoc(docRef)
        .then((res) => {
          tempChats = res.data().chats;
          tempChats.map((user) => {
            if (user.uid === currentUserUid) {
              user.isTyping = true;
            }
          });

          const data = { chats: tempChats };
          updateDoc(docRef, data);
        })
        .catch((err) => console.log(err));
    } else {
      let tempChats = [];
      const docRef = doc(db, "users", userUid);
      getDoc(docRef)
        .then((res) => {
          tempChats = res.data().chats;
          tempChats.map((user) => {
            if (user.uid === currentUserUid) {
              user.isTyping = false;
            }
          });

          const data = { chats: tempChats };
          updateDoc(docRef, data);
        })
        .catch((err) => console.log());
    }
  }, [userInput]);
};

// useUpdateisTyping.propTypes = {
//   currentUserUid: PropTypes.string.isRequired,
//   userUid: PropTypes.string.isRequired,
//   userInput: PropTypes.any.isRequired,
// };

export default useUpdateisTyping;
