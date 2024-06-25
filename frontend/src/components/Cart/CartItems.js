import React from 'react'
import { Link } from "react-router-dom"
import "./CartItemCard.css"
const CartItems = ({ item, deleteCartItem }) => {
    return (
        <div className="cartItemCard">
            <img src={item.image} alt="productimage" />
            <div>

                <Link to={`/product/${item.product}`} >{item.name}</Link>
                <span>{`Price : ₹ ${item.price}`}</span>
                <p onClick={() => deleteCartItem(item.product)} >Remove</p>
            </div>
        </div>
    )
}

export default CartItems;