import React, { Fragment } from 'react';
import "./Cart.css";
import CartItems from "./CartItems.js";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeFromCart } from "../../actions/cartActions";
import { Link } from 'react-router-dom';
import { Typography } from "@material-ui/core";
import { RemoveShoppingCart } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity)
            return;
        dispatch(addItemsToCart(id, newQty))
    }
    const decreaseQuantity = (id, quantity) => {
        const newQunantity = quantity - 1;
        if (newQunantity <= 0) {
            return;
        }
        dispatch(addItemsToCart(id, newQunantity))
    }
    const deleteCartItem = (id) => {
        dispatch(removeFromCart(id));
    }
    const checkoutHandler = () => {
        navigate("/login?redirect=shipping");
    }
    return (
        <Fragment >
            {
                cartItems.length === 0 ?
                    <div className="emptyCart">
                        <RemoveShoppingCart />
                        <Typography>No Product in your Cart</Typography>
                        <Link to={'/products'} >View Products </Link>
                    </div>
                    : <Fragment>
                        <div className='cartPage' >
                            <div className="cartHeader">
                                <p>Product</p>
                                <p>Quantity</p>
                                <p>Subtotal</p>
                            </div>
                            {

                                cartItems && cartItems.map((item) => (<div className="cartContainer">
                                    <CartItems key={item.image} item={item} deleteCartItem={deleteCartItem} />
                                    <div className="cartInput">
                                        <button onClick={() => decreaseQuantity(item.product, item.quantity)} >-</button>
                                        <input type="number" name="" readOnly value={item.quantity} />
                                        <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)} >+</button>
                                    </div>
                                    <div className="cartSubtotal">
                                        ₹{item.quantity * item.price}
                                    </div>
                                </div>)
                                )

                            }
                            <div className="grossTotal">
                                <div></div>
                                <div className="box">
                                    <p>Gross Total</p>

                                    <p>₹ {cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}</p>
                                </div>
                                <div></div>
                                <div className="checkOutBtn">
                                    <button onClick={checkoutHandler} >Check Out</button>
                                </div>
                            </div>
                        </div>
                    </Fragment>}
        </Fragment>
    )
}

export default Cart;