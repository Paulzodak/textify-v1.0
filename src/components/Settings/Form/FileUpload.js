import React, { useState } from "react";
import { storage } from "../../firebase";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { BsFileEarmarkArrowDown as AddIcon } from "react-icons/bs";
import { TfiClose as CloseBtn } from "react-icons/tfi";
import { getDownloadURL, ref } from "firebase/storage";
import { uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import BasicModal from "../../BasicModal";
import swal from "sweetalert";
import { TailSpin } from "react-loader-spinner";
const StyledContainer = styled(motion.div)`
  background-color: white;
  position: fixed;
  /* left: 15%; */
  box-shadow: 0px 0px 80px rgb(235, 235, 235);
  border-radius: 1rem;
  height: 20rem;
  width: 70%;
  /* max-width: 40rem; */
  padding: 1rem;

  box-sizing: border-box;
`;
const StyledH1 = styled.h1`
  /* float: left; */
  font-size: 1.2rem;
`;
const StyledH2 = styled.h2`
  font-size: 1rem;
  color: ${({ cl }) => cl};
  font-weight: bolder;
`;
const StyledH3 = styled.h2`
  font-size: 0.8rem;
  color: ${({ cl }) => cl};
`;
const StyledDashedContainer = styled.div`
  border: 1px dashed ${({ bd }) => bd};
  padding: 0.5rem;
  width: 100%;
  border-radius: 0.5rem;
  height: 15rem;
  box-sizing: border-box;
`;
const StyledUploadBtn = styled.button`
  /* background-color: ${({ bg }) => bg}; */
  box-shadow: 0px 0px 80px rgb(235, 235, 235);
  color: white;
  border: none;
  padding: 0.5rem;
  font-size: 1.2rem;
  width: 8rem;
  height: 3rem;
  text-align: center;
  background-image: linear-gradient(
    to right top,
    #00d1ed,
    #00c5e0,
    #00bad3,
    #00aec6,
    #00a3b9,
    #0098ac,
    #008d9f,
    #008293,
    #007483,
    #006774,
    #005a65,
    #004d57
  );

  border-radius: 0.5rem;
`;
const StyledFileInput = styled.input`
  background-color: ${({ bg }) => bg};
  color: ${({ cl }) => cl};
  border: none;
  padding: 0.5rem;
  max-width: 90%;
  margin-bottom: 1rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  ::-webkit-file-upload-button {
    background-image: linear-gradient(
      to right top,
      #00d1ed,
      #00c5e0,
      #00bad3,
      #00aec6,
      #00a3b9,
      #0098ac,
      #008d9f,
      #008293,
      #007483,
      #006774,
      #005a65,
      #004d57
    );
    color: white;
    border: none;
    padding: 0.5rem;
    max-width: 90%;
    /* margin-bottom: 1rem; */
    font-size: 1rem;
    border-radius: 0.5rem;
  }
`;
const StyledLoadingContainer = styled.div`
  /* border: 1px solid red; */
  width: 3rem;
  height: 100%;
  /* width: 3rem; */
`;
const StyledCloseBtn = styled(motion.span)`
  /* border: 1px solid red; */
  position: absolute;
  right: 2rem;
`;
const FileUpload = ({ setShowUpload }) => {
  const [file, setFile] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [progress, setProgress] = useState(0);
  const { bgGrey } = useSelector((state) => state.styles.colors);
  const { textGrey } = useSelector((state) => state.styles.colors);
  const [imageUpload, setImageUpload] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleFileChange = (e) => {
    setImageUpload(e.target.files[0]);
  };

  const uploadImage = () => {
    if (!imageUpload) {
      return;
    }
    setLoading(true);
    const imageRef = ref(storage, `${currentUser.uid}`);
    uploadBytes(imageRef, imageUpload).then(
      setTimeout(() => {
        getDownloadURL(ref(storage, currentUser.uid)).then((url) => {
          const docRef = doc(db, "users", currentUser.uid);
          const data = { ...currentUser, pictureUrl: url };
          updateDoc(docRef, data).then(() => {
            swal("Uploaded", "Refresh Browser To See Changes!", "success");
            setLoading(false);
            setShowUpload(false);
          });
        });
      }, 3000)
    );
  };

  return (
    <BasicModal marginTop="25%" height="20rem" width="70%">
      <StyledCloseBtn
        onClick={() => setShowUpload(false)}
        whileHover={{ scale: 0.8 }}
        whileTap={{ scale: 0.8 }}
      >
        <CloseBtn color={textGrey} size="1.5rem" />
      </StyledCloseBtn>
      <StyledH1>Upload Image</StyledH1>

      <StyledDashedContainer bd={bgGrey}>
        <AddIcon size="2rem" color={textGrey} />
        <StyledH2 cl={textGrey}>Drag and Drop a picture</StyledH2>
        <StyledH3 cl={textGrey}>OR</StyledH3>
        <StyledFileInput
          bg={bgGrey}
          cl={textGrey}
          type="file"
          onChange={handleFileChange}
        />
        <br />
        <StyledUploadBtn onClick={uploadImage} bg={bgGrey} cl={textGrey}>
          {loading ? (
            <center>
              <StyledLoadingContainer>
                <TailSpin
                  height="36"
                  width="36"
                  color="white"
                  ariaLabel="tail-spin-loading"
                  radius="3"
                  visible={true}
                />
              </StyledLoadingContainer>
            </center>
          ) : (
            "Upload"
          )}
        </StyledUploadBtn>
      </StyledDashedContainer>
    </BasicModal>
  );
};

export default FileUpload;
