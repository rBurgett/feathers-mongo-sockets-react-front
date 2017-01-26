import React from 'react';

const Footer = () => {
    return (
        <div className="container-fluid footer-container">
            <p>{`Copyright © ${new Date().getFullYear()}`}</p>
        </div>
    );
};

export default Footer;
