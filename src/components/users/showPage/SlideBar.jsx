import React from "react";
import "../../../assets/css/sidebar.css";
import { Link } from "react-router-dom";

const SlideBar = () => {
  return (
    <div className="ps-sidebar-container css-dip3t8" data-testid>
      <nav className="ps-menu-root css-vj11vy">
        <ui className="css-ewdv3l">
          <div className="text-center w-100">
            <Link to="/home">
              <img src="" alt="" />
            </Link>
          </div>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ui>
      </nav>
    </div>
  );
};

export default SlideBar;