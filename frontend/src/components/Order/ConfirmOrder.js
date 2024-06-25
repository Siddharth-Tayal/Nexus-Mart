import React, { Fragment } from 'react'
import "./ConfirmOrder.css"
import CheckoutSteps from './CheckoutSteps'
import { useSelector } from 'react-redux'
import MetaData from "../layout/MetaData"
import { Link, useNavigate } from 'react-router-dom'
import { Typography } from '@material-ui/core'

const ConfirmOrder = () => {
    const navigate = useNavigate();
    const { shippingInfo, cartItems } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user);
    const address = `${shippingInfo.address},${shippingInfo.city} ,${shippingInfo.state}-${shippingInfo.pinCode},${shippingInfo.country}`;
    const subTotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price, 0
    )
    const shippingCharges = subTotal >= 500 ? 0 : 80;
    const tax = subTotal * 0.18;
    const total = subTotal + shippingCharges + tax;
    const proceedToPayment = () => {
        const data = {
            subTotal,
            tax, shippingCharges, total,

        }
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        navigate("/payment")
    }
    return <Fragment>
        <MetaData title={"Confirm Order"} />
        <CheckoutSteps activeStep={1} />
        <div className="confirmOrderPage">
            <div>
                <div className="confirmShippingArea">
                    <Typography>Shipping Info</Typography>
                    <div className="confirmShippingAreaBox">
                        <div>
                            <p>Name :</p>
                            <span>{user.name}</span>
                        </div>
                        <div>
                            <p>Phone :</p>
                            <span>{shippingInfo.phoneNo}</span>
                        </div>
                        <div>
                            <p>Address :</p>
                            <span>{address}</span>
                        </div>
                    </div>
                </div>
                <div className="confirmCartItems">
                    <Typography>Your cart Items</Typography>
                    <div className="confirmCartItemContainer">
                        {
                            cartItems && cartItems.map((item) => (
                                <div key={item.product} >
                                    <img src={item.image} alt="Product" />
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    <span>
                                        {item.quantity} X {item.price} = <b>₹{item.price * item.quantity}</b>
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div>
                <div className="orderSummary">
                    <Typography>Order Summary</Typography>
                    <div>
                        <div>
                            <p>SubTotal :</p>
                            <span>₹{subTotal}</span>
                        </div>
                        <div>
                            <p>Shipping Charges :</p>
                            <span>₹{shippingCharges}</span>
                        </div>
                        <div>
                            <p>GST :</p>
                            <span>₹{tax}</span>
                        </div>
                    </div>
                    <div className='orderSummaryTotal'>
                        <p><b> Total :</b></p>
                        <span>₹{subTotal + shippingCharges + tax}</span>
                    </div>
                    <button onClick={proceedToPayment} className='confirmOrderBtn' >Proceed To Payment</button>
                </div>
            </div>
        </div>
    </Fragment>
}

export default ConfirmOrder