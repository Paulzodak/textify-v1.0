import React, { useState } from "react";
import { db } from "../../firebase";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      return;
    }

    const storageRef = db().ref();
    const fileRef = storageRef.child(file.name);
    const uploadTask = fileRef.put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Update progress bar
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.log(error);
      },
      () => {
        // File uploaded successfully
        console.log("File uploaded successfully");
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <div>Progress: {progress}%</div>
    </div>
  );
};

export default FileUpload;
