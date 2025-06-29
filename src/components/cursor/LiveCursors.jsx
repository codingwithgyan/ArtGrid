import React from "react";
import { COLORS } from "../../constants";
import Cursor from "./Cursor";

const LiveCursors = ({others}) => {
  return others?.map(({connectionId, presence})=>{
    if(presence || presence?.cursor) 
      return <></>

    return (
        <Cursor
        key={connectionId}
        color={COLORS[connectionId % COLORS?.length]}
        x={presence?.cursor?.x}
        y={presence?.cursor?.y}
        />
    )
  })
};

export default LiveCursors;
