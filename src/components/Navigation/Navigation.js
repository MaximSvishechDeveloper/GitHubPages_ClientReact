import React from "react";
import "./Navigation.css";
import AccountMenu from "../AccountMenu/AccountMenu";

const Navigation = () => {
  return (
    <nav className="main-nav mr3 mt3">
      <AccountMenu />
    </nav>
  );
};

export default Navigation;
