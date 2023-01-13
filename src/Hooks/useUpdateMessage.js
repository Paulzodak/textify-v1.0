import React from "react";

const useUpdateMessage = ({ currentUser, user }) => {
  let tempChats = [...chats];
  [...tempChats].map((item, index) => {
    if (item.username === chatItemData.username) {
      const chatItem = { ...item };

      chatItem.messages = [...chatItem.messages, data];
      // console.log(chatItem);
      tempChats[index] = chatItem;
      // console.log(tempChats);
    }
  });
  const docRef = doc(db, "users", currentUser.uid);
  const d = { chats: tempChats };
  updateDoc(docRef, d);
};

export default useUpdateMessage;
