import React from "react";
import { useState } from "react";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
const SearchTest = () => {
  const [value, setValue] = useState("");
  const handler = (e) => setValue(e.target.value);
  const search = () => {
    const colRef = collection(db, "users");

    const q = query(colRef, where("name", "==", value));

    onSnapshot(q, (snapshot) => {
      const users = [];
      snapshot.docs.forEach((user) => {
        users.push(user.data());
      });
      console.log(users);
    });
  };
  return (
    <div>
      <input onChange={handler} />
      <button onClick={search}>Search</button>
    </div>
  );
};

export default SearchTest;
