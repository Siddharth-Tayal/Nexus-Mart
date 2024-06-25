import React from 'react'
import play from "../../../images/playstore.png"
import apple from "../../../images/appstore.png"
import "./Footer.css"
const Footer = () => {
    return (
        <footer id='footer'>
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone.</p>
                <img src={play} alt="" />
                <img src={apple} alt="" />
            </div>
            <div className="midFooter">
                <h1>Ecommerce</h1>
                <p>High Qualtiy is our first priority</p>
                <p>Copyrights 2023 &copy; MeRahul</p>
            </div>
            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="https://www.google.com">Instagram</a>
                <a href="https://www.google.com">Facebook</a>
                <a href="https://www.google.com">Whatsapp</a>
            </div>
        </footer>
    )
}

export default Footer