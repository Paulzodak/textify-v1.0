import React from "react";
import MenuDropdownModal from "./MenuDropdownModal";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RxCaretRight as RightArrow } from "react-icons/rx";
import { setActive } from "../../redux/settings";
import { StyledMenuItem } from "./GlobalStyled";
import { StyledMenuName } from "./GlobalStyled";

const NavMenu = ({ items }) => {
  const dispatch = useDispatch();
  const { textGrey } = useSelector((state) => state.styles.colors);
  const { textBlack } = useSelector((state) => state.styles.colors);
  // console.log(items);

  const clickHandler = (item) => {
    console.log(item);
    dispatch(setActive({ index: item.id }));
  };
  return (
    <MenuDropdownModal>
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

export default NavMenu;
