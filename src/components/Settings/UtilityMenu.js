import React from "react";
import MenuDropdownModal from "./MenuDropdownModal";
import { RxCaretRight as RightArrow } from "react-icons/rx";
import { StyledMenuItem } from "./GlobalStyled";
import { StyledMenuName } from "./GlobalStyled";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
const UtilityMenu = ({ items, ps }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { textGrey } = useSelector((state) => state.styles.colors);
  const { textBlack } = useSelector((state) => state.styles.colors);
  console.log(items);

  const clickHandler = async () => {
    navigate("/");
    // SETS ACTIVE TO FALSE IN DB
    // dispatch(setActive({ isActive: false }));
    // const docRef = doc(db, "users", currentUser.uid);
    // const data = { isActive: false };
    // updateDoc(docRef, data);

    await signOut(auth);
  };
  return (
    <MenuDropdownModal ps={ps}>
      {[...items].map((item) => {
        return (
          <StyledMenuItem
            layout={true}
            key={item.title}
            initial={{ opacity: 0, x: -50 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { duration: item.duration },
            }}
            cl={item.active ? textBlack : textGrey}
            whileHover={{ scale: 1.08 }}
            onClick={() => clickHandler(item)}
          >
            <div>{item.icon}</div>
            <StyledMenuName>{item.title}</StyledMenuName>
            <RightArrow />
          </StyledMenuItem>
        );
      })}
    </MenuDropdownModal>
  );
};

export default UtilityMenu;
