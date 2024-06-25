import { Typography } from '@material-ui/core'
import { CheckCircle } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import "./OrderSuccess.css"

const OrderSuccess = () => {
    return (
        <div className='orderSuccessContainer' >
            <CheckCircle />
            <Typography>Your Order has been placed Successfully !!!</Typography>
            <Link to={"/orders/me"}>View Orders</Link>
        </div>
    )
}

export default OrderSuccess