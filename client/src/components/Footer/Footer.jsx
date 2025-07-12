import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <span>© {new Date().getFullYear()} StackIt. All rights reserved.</span>
      <span>Made with ❤️ for ODOO. | Privacy Policy | Terms of Service</span>
    </div>
  </footer>
);

export default Footer; 