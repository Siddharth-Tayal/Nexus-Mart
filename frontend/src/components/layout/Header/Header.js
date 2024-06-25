import React from 'react';
import { ReactNavbar } from "overlay-navbar"
import logo from "../../../images/logo.png"
import { FiShoppingBag, FiSearch } from "react-icons/fi"
import { CgProfile } from 'react-icons/cg';
const Header = () => {
    return <ReactNavbar
        navColor1="white"
        burgerColor="yellow"
        burgerColorHover="black"
        logo={logo}
        logoWidth="20vmax"
        logoHoverSize="10px"
        logoHoverColor="#eb4034"
        logoBackgrounColor="transparent"
        link1Text="Home"
        link2Text="Products"
        link3Text="Contact"
        link4Text="About"

        link1Url="/"
        link2Url="/products"
        link3Url="/contact"
        link4Url="/about"

        link1Size="1.2vmax"
        link1Color="rgba(35,35,35,0.8)"

        nav1justifyContent="flex-end"
        nav2justifyContent="flex-end"
        nav3justifyContent="flex-start"
        nav4justifyContent="flex-start"

        link1ColorHover="#eb4034"
        link1Margin="1vmax"

        profileIcon="true"
        ProfileIconElement={CgProfile}
        profileIconUrl="/login"
        searchIcon="true"
        SearchIconElement={FiSearch}
        cartIcon="true"
        CartIconElement={FiShoppingBag}
        CartIconUrl="/cart"

        profileIconColor="rgb(35,35,35,.8)"
        searchIconColor="rgb(35,35,35,.8)"
        cartIconColor="rgb(35,35,35,.8)"
        profileIconColorHover="#eb4034"
        searchIconColorHover="#eb4034"
        cartIconColorHover="#eb4034"
        cartIconMargin="1vmax"

    />

}

export default Header;