import React from "react";
import * as mdb from "mdb-ui-kit"; // lib
import "./footer.css";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";

const Footer = () => {
  return (
    <footer class="footer">
      <div class="waves">
        <div class="wave" id="wave1"></div>
        <div class="wave" id="wave2"></div>
        <div class="wave" id="wave3"></div>
        <div class="wave" id="wave4"></div>
      </div>

      <p>
        &copy;2023 Private Naukri | All Rights Reserved | Contact : +91
        7889644025
      </p>
    </footer>
  );
};

export default Footer;
