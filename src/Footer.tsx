import React from "react";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h3>COMPANY</h3>
            <ul>
              <li><a href="#">About Last.fm</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Jobs</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>HELP</h3>
            <ul>
              <li><a href="#">Track My Music</a></li>
              <li><a href="#">Community Support</a></li>
              <li><a href="#">Community Guidelines</a></li>
              <li><a href="#">Help</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>GOODIES</h3>
            <ul>
              <li><a href="#">Download Scrobbler</a></li>
              <li><a href="#">Developer API</a></li>
              <li><a href="#">Free Music Downloads</a></li>
              <li><a href="#">Merchandise</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>ACCOUNT</h3>
            <ul>
              <li><a href="#">Inbox</a></li>
              <li><a href="#">Settings</a></li>
              <li><a href="#">Last.fm Pro</a></li>
              <li><a href="#">Logout</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>FOLLOW US</h3>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">YouTube</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="language-select">
            <a href="#" className="language-select_link text-white">English</a>
            <a href="#" className="language-select_link">Deutsch</a>
            <a href="#" className="language-select_link">Español</a>
            <a href="#" className="language-select_link">Français</a>
            <a href="#" className="language-select_link">Italiano</a>
            <a href="#" className="language-select_link">日本語</a>
            <a href="#" className="language-select_link">Polski</a>
            <a href="#" className="language-select_link">Português</a>
            <a href="#" className="language-select_link">Русский</a>
            <a href="#" className="language-select_link">Svenska</a>
            <a href="#" className="language-select_link">Türkçe</a>
            <a href="#" className="language-select_link">简体中文</a>
          </div>
          
          <div className="copyright">
            CBS Interactive © 2022 Last.fm Ltd. All rights reserved. 
            Terms of Use | Privacy Policy | Legal Policies | Cookies Policy | 
            Do Not Sell My Personal Information
          </div>
          
          <div>Made in Manchester - Last.fm Music</div>
          
          <div className="audioscrobbler">
            <span>Audioscrobbler</span>
            <img 
              src={`${process.env.PUBLIC_URL}/img/audioscrobbler.png`} 
              alt="Audioscrobbler" 
            />
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;