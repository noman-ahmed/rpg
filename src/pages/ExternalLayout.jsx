import React from "react";
import Header from "../components/header";
import Footer from "../components/footer/Footer";

function ExternalLayout({ children, isLoggedIn }) {
  return (
    <>
      {!isLoggedIn && <Header />}
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default ExternalLayout;
