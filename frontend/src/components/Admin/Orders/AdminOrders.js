import React, { Fragment, useEffect } from 'react'
import { DataGrid } from "@material-ui/data-grid"
import { Button, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link, useNavigate } from 'react-router-dom'
import { Delete, Edit } from '@material-ui/icons'
import { clearErrors, deleteOrder } from '../../../actions/orderActions'
import { allOrders } from '../../../actions/orderActions'
import Loader from '../../layout/Loader/loader'
import MetaData from '../../layout/MetaData'
const AdminOrders = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { loading, error, orders } = useSelector(state => state.allOrders);
    const { isDeleted } = useSelector((state) => state.updateDeleteOrder);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    }
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
                    <Fragment className="actionFieldTable">
                        <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                            <Edit />
                        </Link>
                        <Button onClick={() => deleteOrderHandler(params.getValue(params.id, "id"))}>
                            <Delete />
                        </Button>
                    </Fragment>
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
        } if (isDeleted) {
            alert.success("Order deleted Successfully");
            navigate("/admin/orders")
        }
        dispatch(allOrders());

    }, [dispatch, alert, error, isDeleted, navigate]);

    return (
        <Fragment>
            <MetaData title={`All Orders --Admin`} />
            {
                loading ? (
                    <Loader />
                ) : (
                    <div className="myOrdersPage">
                        <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className='productListTable' autoHeight />
                        <Typography id="myOrdersHeading" >Admin's Orders</Typography>
                    </div>
                )
            }
        </Fragment>
    )
}

export default AdminOrders