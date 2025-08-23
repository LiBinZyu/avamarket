import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Documentation */}
          <div className="footer-section">
            <h3 className="footer-title">Documentation</h3>
            <ul className="footer-links">
              <li>
                <span className="footer-link">Getting Started</span>
              </li>
              <li>
                <span className="footer-link">API Reference</span>
              </li>
              <li>
                <span className="footer-link">Tutorials</span>
              </li>
              <li>
                <span className="footer-link">Examples</span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-section">
            <h3 className="footer-title">Company</h3>
            <ul className="footer-links">
              <li>
                <span className="footer-link">About</span>
              </li>
              <li>
                <span className="footer-link">Careers</span>
              </li>
              <li>
                <span className="footer-link">Contact and Support</span>
              </li>
              <li>
                <span className="footer-link">Terms of Service</span>
              </li>
              <li>
                <span className="footer-link">Privacy Policy</span>
              </li>
            </ul>
          </div>

          {/* Product */}
          <div className="footer-section">
            <h3 className="footer-title">Product</h3>
            <ul className="footer-links">
              <li>
                <span className="footer-link">RAG</span>
              </li>
              <li>
                <span className="footer-link">Agent Portal</span>
              </li>
              <li>
                <span className="footer-link">Workflows</span>
              </li>
            </ul>
          </div>

          {/* Client */}
          <div className="footer-section">
            <h3 className="footer-title">Client</h3>
            <ul className="footer-links">
              <li>
                <span className="footer-link">Medical</span>
              </li>
              <li>
                <span className="footer-link">Healthcare</span>
              </li>
              <li>
                <span className="footer-link">Energy</span>
              </li>
              <li>
                <span className="footer-link">Mechanicals</span>
              </li>
              <li>
                <span className="footer-link">FMPG</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Company Info */}
        <div className="flex items-center gap-2 border-t border-[var(--border-color)] pt-4 mt-4 justify-center">
            <div className="flex items-center select-none">
              <div className="w-2 h-2 mr-2 bg-[var(--primary-font)] rounded-card flex items-center justify-center shadow-card"></div>
              <span className="roboto-mono-bold text-sm text-primary-font tracking-tight">AvaMarket</span>
            </div>
            <div className="roboto-mono-regular text-xs text-secondary-font">
              © 2025 Avaca Co Ltd. All rights reserved.
            </div>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
