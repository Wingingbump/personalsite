import React from "react";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="socialMedia">
        <a href="https://www.linkedin.com/in/tommyle03" target="_blank" rel="noopener noreferrer">
          <LinkedInIcon />
        </a>
        <a href="https://github.com/Wingingbump" target="_blank" rel="noopener noreferrer">
          <GitHubIcon />
        </a>
      </div>
      <p>Tommy Le</p>
    </div>
  );
}

export default Footer;