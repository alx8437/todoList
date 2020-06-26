import React from 'react';
import './App.css';


const CloseButton = (props) => {
    return (
        <span onClick={props.dellEntity} className={"closeButton"}></span>
    )
};

export default CloseButton;