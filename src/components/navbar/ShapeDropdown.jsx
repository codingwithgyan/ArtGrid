import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  Button
} from "@mui/material";
import "./navbar.scss";

const ShapeDropdown = ({
  item,
  activeElement,
  handleActiveElement,
  handleImageUpload,
  imageInputRef,
  ICON_SIZE,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  const isDropdownElem = item.value.some(
    elem => elem?.value === activeElement.value
  )
  return (
    <>
      <div className="shape-dropdown-main-container">
        <div 
          className={`menu-btn menu-border-radius ${isDropdownElem ? "active-item" : ""}`} 
          onClick={handleMenuOpen}
        >
            <img
              src={isDropdownElem ? activeElement.icon : item.icon}
              alt={item.name}
              fill
              height={`${ICON_SIZE}px`} width={`${ICON_SIZE}px`}
            />
        </div>

        <Menu 
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        className="shape-dropdown-menu-wrapper">
          {item.value.map(elem => (
            <MenuItem id="menu-item" onClick={() => handleActiveElement(elem)}>
            <div
              className={`menu-item-wrapper menu-btn no-ring ${activeElement?.value === elem?.value ? "active-item" : ""}`} 
              key={elem?.name}
              onClick={() => {
                handleActiveElement(elem)
              }}
            >
              <div className="icon-wrapper">
                <img
                  src={elem?.icon}
                  alt={elem?.name}
                  width={20}
                  height={20}
                  className={
                    activeElement.value === elem?.value ? "invert" : ""
                  }
                />
              </div>
                <p
                  className={`text-sm  ${
                    activeElement.value === elem?.value
                      ? "text-primary-black"
                      : "text-white"
                  }`}
                >
                  {elem?.name}
                </p>
            </div>
              </MenuItem>
          ))}
        </Menu>
      </div>

      <input
        type="file"
        className="hidden"
        ref={imageInputRef}
        accept="image/*"
        onChange={handleImageUpload}
      />
    </>
  )
}

export default ShapeDropdown;
