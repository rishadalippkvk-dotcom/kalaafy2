import React from 'react';
import './Footer.css';
import logo from '../assets/logo.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <div className="footer-logo">
                            <a href="https://duxford.in"><img src="/images/College-Logo.jpeg" alt="College Logo" className="footer-logo-image" /></a>
                        </div>
                        <p className="footer-tagline" style={{ textAlign: 'center' }}>
                            “Talent Speaks Louder than Words"
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="#home">Home</a></li>
                            <li><a href="#programs">Programs</a></li>
                            <li><a href="#scoreboard">Scoreboard</a></li>
                            <li><a href="#notices">Notices</a></li>
                            <li><a href="#gallery">Gallery</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Contact Us</h4>
                        <div className="contact-info">
                            <p>https://duxford.in</p>
                            <p> +91 9072246500</p>
                            <p style={{ textAlign: 'center' }}>  Duxford Edupark</p>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4>Follow Us</h4>
                        <div className="social-links">
                            <a href="https://www.instagram.com/duxford_college?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="social-icon"><img src="/images/instagram.png" alt="INSTAGRAM" /></a>
                            <a href="https://www.instagram.com/duxfordcollegeunion2025_26?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="social-icon"><img src="/images/instagram.png" alt="insta" /></a>
                            {/* <a href="#" className="social-icon">🐦</a>
                            <a href="" className="social-icon">▶️</a> */}
                        </div>
                    </div>
                </div>

                <div className="footer-bottom" style={{ justifyContent: 'space-evenly' }}>
                    <p>&copy; {currentYear} Kalaafy. All rights reserved.</p>
                    <p>Created By Department Of Computer Application</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
