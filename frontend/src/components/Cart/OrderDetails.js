import React, { Fragment, useEffect } from 'react'

import "./orderDetails.css"
import { useParams, Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import Loader from '../layout/Loader/loader'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getOrderDetails } from '../../actions/orderActions'
import { Typography } from '@material-ui/core'
const OrderDetails = () => {
    const { loading, error, order } = useSelector(state => state.orderDetails);
    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        };
        dispatch(getOrderDetails(params.id));
    }, [dispatch, error, alert, params.id])
    return (
        <Fragment>
            {
                loading ? <Loader /> : <Fragment>
                    <MetaData title={"Order Details"} />
                    <div className="orderDetailPage">
                        <div className="orderDetailContainer">
                            <Typography component={"h1"}>
                                Order #{order._id}
                            </Typography>
                            <Typography>Shipping Info</Typography>
                            <div className="orderDetailContainerBox">
                                <div>
                                    <p>Name :</p>
                                    <span>{order.user && order.user.name}</span>
                                </div>
                                <div>
                                    <p>Phone :</p>
                                    <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                                </div>
                                <div>
                                    <p>Address :</p>
                                    <span>{order.shippingInfo && `${order.shippingInfo.address},${order.shippingInfo.city} ,${order.shippingInfo.state}-${order.shippingInfo.pinCode},${order.shippingInfo.country}`}</span>
                                </div>
                            </div>
                            <Typography>Payment</Typography>
                            <div className="orderDetailContainerBox">
                                <div>
                                    <p className={
                                        order.paymentInfo && order.paymentInfo.status === "succeeded" ? "greenColor" : "redColor"
                                    }>
                                        {
                                            order.paymentInfo && order.paymentInfo.status === "succeeded" ? "Paid" : "Not Paid"
                                        }
                                    </p>
                                </div>
                                <div>
                                    <p>Amount :</p>
                                    <span>{order.totalPrice && order.totalPrice}</span>
                                </div>
                            </div>
                            <Typography>Order Status</Typography>
                            <div className="orderDetailContainerBox">
                                <div>
                                    <p
                                        className={
                                            order.orderStatus && order.orderStatus === "Delivered" ? "greenColor" : "redColor"
                                        }>
                                        {
                                            order.orderStatus && order.orderStatus
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="orderDetailsCartItem">
                                <Typography>Order Items:</Typography>
                                <div className='orderDetailCartItemsContainer' >
                                    {
                                        order.orderItems && order.orderItems.map((item) => (
                                            <div key={item.product} >
                                                <img src={item.image} alt={item.name} />
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                <span>{item.quantity} X {item.price} = {""}{item.quantity * item.price}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            }

        </Fragment >
    )
}

export default OrderDetails