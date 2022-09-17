import React from 'react'
import { NavLink } from 'react-router-dom'
import './SidebarOption.css'

const SidebarOption = ({ path, Icon, text, className, onClick }) => {

    return (
        <>
            {
                path ? <NavLink
                    to={path}
                    className={({ isActive }) => (`sidebar_option-wrapper ${isActive && "sidebarOption_active"}`)}>
                    <div className="sidebar_option">
                        <Icon />
                        <h2>{text}</h2>
                    </div>
                </NavLink> : <div className={`sidebar_option-wrapper ${className && className}`} onClick={onClick}>
                    <div className="sidebar_option">
                        <Icon />
                        <h2>{text}</h2>
                    </div>
                </div>
            }
        </>
    )
}

export default SidebarOption