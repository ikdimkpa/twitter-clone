import React from 'react'
import './Loader.css'

const Loader = ({top}) => {
    return (
        <div className={`loading_wrapper ${top && 'loading_wrapper_top'}`}>
            <div className="loading"></div>
        </div>
    )
}

export default Loader