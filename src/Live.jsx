import React from 'react';
import { useMyPresence, useOthers } from "@liveblocks/react";
import LiveCursors from "./components/cursor/LiveCursors";
import { useCallback } from "react";
const Live = ({canvasRef}) => {
    const others = useOthers();
    const [myPresence, updateMyPresence] = useMyPresence();
    const {cursor} = myPresence;
    
    const handleMouseMove = useCallback((event)=>{
        event?.preventDefault();
        const x = Math.round(event.clientX) - event.currentTarget.getBoundingClientRect().x;
        const y = Math.round(event.clientY) - event.currentTarget.getBoundingClientRect().y;
        updateMyPresence({
            cursor: {
              x: x,
              y: y,
           },
        });
    },[]);

    const handleMouseLeave = useCallback(()=>{
       updateMyPresence({
          cursor: null,
        });
    },[]);

    const handleMouseDown = useCallback((event)=>{
       const x = Math.round(event.clientX) - event.currentTarget.getBoundingClientRect().x;
        const y = Math.round(event.clientY) - event.currentTarget.getBoundingClientRect().y;
        updateMyPresence({
            cursor: {
              x: x,
              y: y,
           },
        });
    },[]);

  return (
    <div
    onPointerMove={handleMouseMove}
    onPointerLeave={handleMouseLeave}
    onPointerDown={handleMouseDown}
    className="live-main-container"
    id="canvas"
    >
      <canvas ref={canvasRef}/>
      <LiveCursors others={others}/>
    </div>
  )
};

export default Live;
