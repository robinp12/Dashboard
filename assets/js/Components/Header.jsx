import React, { Component, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";

const Header = ({title,other}) => {
        
    return (
            <>
                <div className="headerrr">
                    <span className="lead">{title}</span>
                    <span className=" float-right mr-4">{other}</span>
                </div>
                <hr />
            </>
        );
}
export default Header;