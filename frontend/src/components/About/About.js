import { Instagram, YouTube } from '@material-ui/icons'
import React from 'react'
import Profile from "../../images/wallpaper.jpg"
import "./About.css"

const About = () => {
    return <div className="aboutContainer">
        <div className="aboutBox">
            <div className="aboutBoxInside">
                <div className="headingAbout">About Us</div>
                <div className="aboutContent">
                    <div className="aboutLeft">
                        <img src={Profile} alt="" />
                        <p className='name' >Siddharth Tayal</p>
                        <a href="www.youtube.com">VISIT INSTAGRAM</a>
                        <p>This is a <span>Ecommerce</span> website made by @siddharthTayal. Only by the purpose to provide an intresting way to shop for customers and Easy way to manage for Owner.</p>
                    </div>
                    <div className="aboutRight">
                        <h2>Our Brands</h2>
                        <div className="links">
                            <a className='youtube' href="https://youtube.com">
                                <YouTube />
                            </a>
                            <a className='instagram' target='blank' href="https://www.instagram.com/s_tayal_01/">
                                <Instagram />
                            </a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

}

export default About