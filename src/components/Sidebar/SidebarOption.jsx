import React from 'react'
import { NavLink } from 'react-router-dom'
import './SidebarOption.css'

const SidebarOption = ({ path, Icon, text, className, onClick }) => {
    const activeTab = (path) => {
        if (window.location.pathname === path) {
            return true;
        }
    };

    return (
        <>
            {
                path ? <NavLink
                    to={path}
                    className={`sidebar_option-wrapper ${activeTab(path) && "sidebarOption_active"}`}>
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