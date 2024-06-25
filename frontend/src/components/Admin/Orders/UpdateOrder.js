import React, { Fragment, useEffect, useState } from 'react'
import "./UpdateOrder.css"
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../../layout/MetaData'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Typography } from '@material-ui/core'
import SideBar from '../SideBar/SideBar'
import Loader from '../../layout/Loader/loader'
import { clearErrors, getOrderDetails, updateOrder } from '../../../actions/orderActions'
import { useAlert } from 'react-alert'
import { AccountTree } from '@material-ui/icons'
import { ADMIN_ORDER_UPDATE_RESET } from '../../../constants/orderConstants'

const UpdateOrder = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const [status, setStatus] = useState("");
    const { order, error, loading } = useSelector(state => state.orderDetails)
    const { error: updateError, isUpdated } = useSelector((state) => state.updateDeleteOrder)

    const processOrder = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("status", status);
        dispatch(updateOrder(params.id, myForm))
    }
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatchEvent(clearErrors);

        } if (updateError) {
            alert.error(updateError);
            dispatchEvent(clearErrors);

        } if (isUpdated) {
            alert.success("Order status updated Successfully");
            dispatch({ type: ADMIN_ORDER_UPDATE_RESET });
        }
        dispatch(getOrderDetails(params.id));

    }, [dispatch, alert, error, params.id, navigate, isUpdated, updateError])
    return <Fragment>
        <MetaData title={"Process Order"} />
        <div className="dashboard">
            <SideBar />

            {
                loading ? <Loader /> :
                    <div className="confirmOrderPage"
                        style={{
                            display: order.orderStatus === "delivered" ? "block" : "grid"
                        }}
                    >
                        <div>
                            <div className="confirmShippingArea">
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
                            </div>
                            <div className="confirmCartItems">
                                <Typography>Order Items</Typography>
                                <div className="confirmCartItemContainer">
                                    {
                                        order.orderItems && order.orderItems.map((item) => (
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
                        {
                            order.orderStatus !== "delivered" &&
                            <div>
                                <div>
                                    <form encType='multipart/form-data' className="updateOrderForm" onSubmit={processOrder}>
                                        <h1>Process Order</h1>

                                        <div>
                                            <AccountTree />
                                            <select onChange={(e) => setStatus(e.target.value)}>
                                                <option value="">Process</option>
                                                {
                                                    order.orderStatus === 'Processing' &&
                                                    <option value="Shipped">Shipped</option>
                                                }
                                                {

                                                    order.orderStatus === 'Shipped' &&
                                                    <option value="Delivered">Delivered</option>
                                                }
                                            </select>
                                        </div>
                                        <Button id='createProductBtn' type='submit' disabled={loading ? true : false || status === "" ? true : false} >
                                            Process
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        }
                    </div>
            }
        </div>
    </Fragment >
}

export default UpdateOrder