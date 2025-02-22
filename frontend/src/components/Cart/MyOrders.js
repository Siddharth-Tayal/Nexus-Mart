import React, { Fragment, useEffect } from 'react'
import { DataGrid } from "@material-ui/data-grid"
import "./myOrders.css"
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader/loader'
import { Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearErrors } from '../../actions/userAction'
import { myOrders } from '../../actions/orderActions'
import { Link } from 'react-router-dom'
import { Launch } from '@material-ui/icons'
const MyOrders = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, orders } = useSelector(state => state.myOrders);
    const { user } = useSelector((state) => state.user);
    const columns = [
        {
            field: "id", headerName: " Order Id", minWidth: 300, flex: 1
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150, flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150, flex: 0.3
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5
        },
        {
            field: "action",
            headerName: "ACTION",
            minWidth: 150,
            type: "number",
            flex: 0.3,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <Launch />
                    </Link>
                )
            }
        }
    ];
    const rows = [];
    orders && orders.forEach((item, index) => {
        rows.push({
            itemsQty: item.orderItems.length,
            id: item._id,
            amount: item.totalPrice,
            status: item.orderStatus,
        })
    });
    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders());

    }, [dispatch, alert, error]);

    return (
        <Fragment>
            <MetaData title={`${user.name}'s - Orders`} />
            {
                loading ? (
                    <Loader />
                ) : (
                    <div className="myOrdersPage">
                        <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className='myOrdersTable' autoHeight />
                        <Typography id="myOrdersHeading" >{user.name}'s Orders</Typography>
                    </div>
                )
            }
        </Fragment>
    )
}

export default MyOrders