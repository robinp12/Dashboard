import React, { Component, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const Header = ({ title, center, right }) => {
  return (
    <>
      <div className="headerrr">
        <span className="lead mr-1">{title}</span>
        <small className="ml-3 text-muted">{center}</small>
        <span className="float-right mr-4">{right}</span>
      </div>
      <hr />
    </>
  );
};
export default Header;
