import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert"
import { Link } from "react-router-dom"
import SideBar from "../SideBar/SideBar"
import Loader from "../../layout/Loader/loader"
import { Delete, Edit } from "@material-ui/icons"
import "./ProductList.css"
import { Button, Typography } from '@material-ui/core';
import { DataGrid } from "@material-ui/data-grid"
import MetaData from "../../layout/MetaData"
import { clearErrors, deleteProduct, getAdminProducts } from '../../../actions/productAction';
import { ADMIN_PRODUCT_DELETE_RESET } from '../../../constants/productConstants';
const ProductList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, loading, products } = useSelector(state => state.products);
    const { isDeleted, error: deleteError } = useSelector(state => state.deleteProduct)

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            alert.success("Product deleted Successfully");
            dispatch({ type: ADMIN_PRODUCT_DELETE_RESET });
        }
        dispatch(getAdminProducts());
    }, [error, alert, dispatch, deleteError, isDeleted])

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
        { field: "name", headerName: "Name", minWidth: 350, flex: 1 },
        { field: "stock", headerName: "Stock", type: "number", minWidth: 150, flex: 0.3 },
        { field: "price", headerName: "Price", type: "number", minWidth: 270, flex: 0.5 },
        {
            field: "action", headerName: "Actions", type: "number", minWidth: 150, sortable: false, flex: 0.3, renderCell: (params) => {
                return (
                    <Fragment >
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`} >
                            <Edit />
                        </Link>
                        <Button onClick={() => deleteProductHandler(params.getValue(params.id, "id"))} >
                            <Delete />
                        </Button>
                    </Fragment>
                )
            }
        },
    ];
    const rows = [];

    products && products.forEach(item => {
        rows.push({
            id: item._id,
            stock: item.stock,
            price: item.price,
            name: item.name,
        })
    });
    return <Fragment>
        {
            loading ? <Loader /> : <Fragment> <MetaData title={"ALL PRODUCTS -- Admin"} />
                <div className="dashboard">
                    <SideBar />
                    <div className="productListContainer">
                        <Typography component={'h1'}>ALL PRODUCTS</Typography>
                        <DataGrid className='productListTable' rows={rows} columns={columns} />
                    </div>
                </div>
            </Fragment>
        }

    </Fragment>

}

export default ProductList;