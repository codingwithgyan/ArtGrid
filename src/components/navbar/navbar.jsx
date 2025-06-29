import React from 'react';
import LiveUsers from "../users/LiveUsers";
import "./navbar.scss"
import NewThread from '../comments/NewThread';
import { navElements } from '../../lib/constants';
import {Button} from "@mui/material";
import ShapeDropdown from './ShapeDropdown';
const Navbar = ({activeElement, handleActiveElement}) => {
    const LOGO_SIZE = 70;
    const ICON_SIZE = 20;
  return (
    <div className="navbar-main-container">
      <div className="logo-wrapper">
        <img height={`${LOGO_SIZE}px`} width={`${LOGO_SIZE}px`} src="artgrid-icon.png"/>
      </div>
        <div className='navbar-toolbar-main-container'>
        {
          navElements?.map(item=>{
            if(Array.isArray(item.value)) 
              return <ShapeDropdown item={item} activeElement={activeElement} handleActiveElement={handleActiveElement} ICON_SIZE={ICON_SIZE}/>
            else if(item.value === "commnet") 
              return (
              <NewThread>

              </NewThread>
            )
            
            return (
              <div className={`menu-btn menu-border-radius ${item?.value === activeElement?.value ? 'active-item':''}`} onClick={()=>handleActiveElement(item)}>
                <img height={`${ICON_SIZE}px`} width={`${ICON_SIZE}px`} src={item?.icon} alt={item?.name} />
              </div>
            )
          })
        }
        </div>
      <div>
        <LiveUsers/>
      </div>
    </div>
  )
};

export default Navbar
