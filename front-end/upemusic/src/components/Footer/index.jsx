import React from 'react';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import '../Footer/styles.css';

export const Footer = () => {
    return (
        <div className="footer">
            <div>
                <span className="name">Emílio Gabriel</span>
                <a href="https://www.instagram.com/emilio.gabriel_"><FaInstagram className="icon" /></a>
                <a href="https://www.linkedin.com/in/emiliogabriel18"><FaLinkedin className="icon" /></a>
                <a href="https://github.com/Emio-eng"><FaGithub className="icon" /></a>
            </div>
            <div>
                <span className="name">Jonas Soares</span>
                <a href="https://instagram.com/jonas_3301"><FaInstagram className="icon" /></a>
                <a href="https://www.linkedin.com/in/jonas-soares-7a83391b8/"><FaLinkedin className="icon" /></a>
                <a href="https://github.com/Jonah21-prog"><FaGithub className="icon" /></a>
            </div>
        </div>
    );
}

