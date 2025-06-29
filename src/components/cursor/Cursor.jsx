import CursorSVG from "../../assets/CursorSvg";
import "./cursor.scss";
const Cursor = ({color, x, y}) => {
  return (
    <div className="cursor-main-component" style={{transform: `translate(${x}px, ${y}px)`, position:"absolute",zIndex:999 }}>
        <CursorSVG color={color} />
    </div>
  )
};

export default Cursor
