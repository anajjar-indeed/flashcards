import React from "react";
import Header from "./Header";
import RootRouter from "./RootRouter";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
          <RootRouter />
      </div>
    </>
  );
}

export default Layout;
