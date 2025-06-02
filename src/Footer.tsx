import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-sections">
          <div className="footer-section">
            <h4>Company</h4>
            <a href="#">About Last.fm</a>
            <a href="#">Contact Us</a>
            <a href="#">Jobs</a>
          </div>
          <div className="footer-section">
            <h4>Help</h4>
            <a href="#">Track My Music</a>
            <a href="#">Community Support</a>
            <a href="#">Community Guidelines</a>
            <a href="#">Help</a>
          </div>
          <div className="footer-section">
            <h4>Goodies</h4>
            <a href="#">Download Scrobbler</a>
            <a href="#">Developer API</a>
            <a href="#">Free Music Downloads</a>
            <a href="#">Merchandise</a>
          </div>
          <div className="footer-section">
            <h4>Account</h4>
            <a href="#">Inbox</a>
            <a href="#">Settings</a>
            <a href="#">Last.fm Pro</a>
            <a href="#">Logout</a>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
            <a href="#">YouTube</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="language-selector">
            <a href="#">English</a>
            <a href="#">Deutsch</a>
            <a href="#">Español</a>
            <a href="#">Français</a>
            <a href="#">Italiano</a>
            <a href="#">日本語</a>
            <a href="#">Polski</a>
            <a href="#">Português</a>
            <a href="#">Русский</a>
            <a href="#">Svenska</a>
            <a href="#">Türkçe</a>
            <a href="#">简体中文</a>
          </div>
          <div className="audioscrobbler-logo">
            Audioscrobbler
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;