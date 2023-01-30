import React from "react";
import Sidebar from "../components/Sidebar";
import MainContainer from "../components/MainContainer";

function Layout() {
  return (
    <section className="layout-section">
      <div className="layout-container">
        <Sidebar />
        <MainContainer />
      </div>
    </section>
  );
}

export default Layout;
