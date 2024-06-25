import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert"
import "./Review.css"
import SideBar from "../SideBar/SideBar"
import Loader from "../../layout/Loader/loader"
import { Delete, Star } from "@material-ui/icons"
import { Button, Typography } from '@material-ui/core';
import { DataGrid } from "@material-ui/data-grid"
import MetaData from "../../layout/MetaData"
import { clearErrors, deleteReview, getAllReviews } from '../../../actions/productAction';
import { ADMIN_REVIEW_DELETE_RESET } from '../../../constants/productConstants';
import { useNavigate } from 'react-router-dom';
const ProductList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const [productId, setProductId] = useState("");
    const { error, loading, reviews } = useSelector(state => state.allReview);
    const { isDeleted, error: deleteError } = useSelector(state => state.deleteReview)

    const deleteReviewHandler = (id) => {
        dispatch(deleteReview(id, productId));
    }
    const updateProductFormSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId));
    }

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getAllReviews(productId));
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            alert.success("Review deleted Successfully");
            dispatch({ type: ADMIN_REVIEW_DELETE_RESET });
            navigate('/admin/dashboard')
        }
        // dispatch(getAllReviews());
    }, [error, alert, dispatch, deleteError, isDeleted, productId, navigate])

    const columns = [
        { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
        { field: "user", headerName: "User", minWidth: 350, flex: 1 },
        { field: "comment", headerName: "Comment", type: "number", minWidth: 350, flex: 1 },
        {
            field: "rating", headerName: "Rating", type: "number", minWidth: 270, flex: 0.5
            , cellClassName: (params) => {
                return params.getValue(params.id, "rating") >= 3 ? "greenColor" : "redColor";
            },
        },
        {
            field: "action", headerName: "Actions", type: "number", minWidth: 150, sortable: false, flex: 0.3, renderCell: (params) => {
                return <Button onClick={() => deleteReviewHandler(params.getValue(params.id, "id"))} >
                    <Delete />
                </Button>

            }
        },
    ];
    const rows = [];

    reviews && reviews.forEach(item => {
        rows.push({
            id: item._id,
            rating: item.rating,
            comment: item.comment,
            user: item.name,
        })
    });
    return <div className="dashboard">
        <SideBar />
        {
            loading ? <Loader /> : <Fragment >
                <div className="reviewListContainer">
                    <MetaData title={"ALL Reviews -- Admin"} />
                    <div className='reviewFormContainer' >
                        <form encType='multipart/form-data' className="createProductForm" onSubmit={(e) => updateProductFormSubmitHandler(e)}>
                            <Typography component={'h1'}>ALL Reviews</Typography>
                            <div>
                                <Star />
                                <input type="text" placeholder='Product Id' required value={productId} onChange={(e) => setProductId(e.target.value)} />
                            </div>

                            <Button id='createProductBtn' type='submit' disabled={loading ? true : false} >
                                Show
                            </Button>
                        </form>

                    </div>
                    <div>
                        {
                            (reviews && reviews.length > 0) ? <DataGrid className=' productListTable ' rows={rows} columns={columns} /> :
                                <Typography component={'h1'} id="noProductReview"   >
                                    No reviews
                                </Typography>

                        }
                    </div>

                </div>
            </Fragment>
        }

    </div>

}

export default ProductList;