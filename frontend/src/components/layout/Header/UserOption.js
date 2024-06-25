import React, { Fragment, useState } from 'react'
import "./Header.css"
import { Backdrop } from '@material-ui/core'
import { SpeedDial, SpeedDialAction } from "@material-ui/lab"
import { Dashboard, Person, ExitToApp, ListAlt, ShoppingCart } from "@material-ui/icons"
import { useAlert } from "react-alert"
import { useNavigate } from 'react-router'
import { logout } from "../../../actions/userAction"
import { useDispatch, useSelector } from "react-redux"
import Profile from "../../../images/profile.png"
const UserOption = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { cartItems } = useSelector(state => state.cart)
    const [open, setOpen] = useState(false);
    const options = [
        { icon: <ListAlt />, name: "Orders", func: orders },
        { icon: <Person />, name: "Profile", func: account },
        { icon: <ShoppingCart style={{ color: cartItems.length > 0 ? "tomato" : "unset" }} />, name: `Cart(${cartItems.length})`, func: cart },
        { icon: <ExitToApp />, name: "LogOut", func: logoutUser },
    ]
    if (user.role === 'admin') {
        options.unshift({ icon: <Dashboard />, name: "Dashboard", func: dashboard })
    }
    function dashboard() {
        navigate('/admin/dashboard');
    }
    function orders() {
        navigate('/orders/me');
    }
    function account() {
        navigate('/account');
    }
    function cart() {
        navigate('/cart');
    }
    function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully")
    }
    return (
        <Fragment>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                style={{ zIndex: "11" }}
                ariaLabel='SpeedDial tooltip example'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                direction='down'
                className='speedDial'
                open={open}
                icon={<img className='speedDialIcon' src={user.avatar.url ? user.avatar.url : { Profile }} alt='Profile' />}
            >

                {
                    options.map((i) =>
                        <SpeedDialAction key={i.name} icon={i.icon} tooltipTitle={i.name} onClick={i.func} tooltipOpen />)
                }
            </SpeedDial>
        </Fragment>
    )
}

export default UserOption