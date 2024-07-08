import React from "react";
import SlideBar from "./showPage/SlideBar";
import Header from "./showPage/Header";
import Main from "./showPage/Main";
const HomePage = () => {
  return (
    <div style={{ display: "flex", position: "sticky" }}>
      <aside
        data-testid="ps-sidebar-root-test-id"
        className="ps-sidebar-root ps-collapsed css-1wvake5"
      >
        <div
          data-testid="ps-sidebar-container-test-id"
          className="ps-sidebar-container css-dip3t8"
          style={{ height: "900px", width: "79px" }}
        ></div>
      </aside>

      <div
        className="w-100 menu-height-dynamic"
        style={{ marginLeft: "300px" }}
      >
        <div
          className="site-main"
          style={{ padding: "20px", height: "466px", width: "1125px" }}
        >
          <div className="container">
            <div className="row text-center">
              <div className="col-12 col-md-12 ">
                <div className="wrap-content">
                  <Header />
                </div>
                <br />
                <div className="">
                  <Main />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
