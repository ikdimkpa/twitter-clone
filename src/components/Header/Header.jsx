import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownwardOutlined } from '@mui/icons-material';
import './Header.css';

const Header = ({ showBackIcon, headerText }) => {
    return (
        <>
            {
                showBackIcon ? <Link to={- 1} className="wrapper_header" >
                    <div className="wrapper_header_back" >
                        <ArrowDownwardOutlined />
                    </div>
                    <h2>{headerText}</h2>
                </Link> : <div className="wrapper_header">
                    <h2>{headerText}</h2>
                </div>
            }
        </>
    )
}

export default Header