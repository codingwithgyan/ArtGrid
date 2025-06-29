import React from "react";
import Tooltip from "@mui/material/Tooltip";
import "./users.scss";
const Avatars = ({ name, style, userkey}) => {
    const AVATAR_SIZE = 40;

  return (
    <div className="avatar-main-container">
        <div style={{height:`${AVATAR_SIZE}px`, width: `${AVATAR_SIZE}px` }} className={`avatar ${userkey == "YOUSELF" ? "yourself":""}`}>
            <Tooltip title={name}>
                <img 
                style={style} 
                className="avatar_picture" 
                src={`https://liveblocks.io/avatars/avatar-${Math.floor(
        Math.random() * 30
      )}.png`} 
                />
            </Tooltip>
        </div>
    </div>
  )
};

export default Avatars
