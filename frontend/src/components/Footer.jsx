import React from "react";

const Footer = () => {
  return (
    <footer style={{ padding: "1rem", textAlign: "center", fontSize: "0.8rem" }}>
      © {new Date().getFullYear()} LearnSphere. All rights reserved.
    </footer>
  );
};

export default Footer;
