import React, { Fragment, useEffect, useState } from 'react'
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css"
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, getProductDetails, newReview } from "../../actions/productAction"
import { useNavigate, useParams } from 'react-router-dom';
import ReviewCard from "./ReviewCard"
import Loader from "../layout/Loader/loader"
import { useAlert } from "react-alert"
import MetaData from "../layout/MetaData"
import { addItemsToCart } from "../../actions/cartActions"
import {
    Dialog, DialogActions, DialogContent, DialogTitle, Button
} from "@material-ui/core"
import { Rating } from "@material-ui/lab"
import { ADD_REVIEW_RESET } from '../../constants/productConstants';

const ProductDetails = () => {


    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();
    const navigate = useNavigate();
    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { success, error: reviewError } = useSelector(state => state.newReview);
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);


    const increaseQuantity = () => {
        if (product.stock <= quantity) return;
        setQuantity(quantity + 1);
    }

    const decreaseQuantity = () => {
        if (quantity > 1)
            setQuantity(quantity - 1);
    }
    const addToCartHandler = () => {

        dispatch(addItemsToCart(params.id, quantity));
        alert.success("Item added to cart");
    }

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    }
    const reviewSubmitHandler = () => {

        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", params.id);
        dispatch(newReview(myForm));
        setOpen(false);
    }
    useEffect(() => {
        if (error) {
            navigate(`/noproduct/${params.id}`);
            dispatch(clearErrors());

        }
        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors())
        }
        if (success) {
            alert.success("Review Submitted Successfully")
            dispatch({ type: ADD_REVIEW_RESET })
        }
        dispatch(getProductDetails(params.id))
    }, [dispatch, params.id, alert, error, reviewError, navigate, loading, success]);
    const options = {
        size: "large",
        readOnly: true,
        precision: 0.5,
        value: product.ratings,
    }
    return (
        <Fragment>
            {
                loading ? <Loader /> : <Fragment >
                    <MetaData title={`${product.name} --Ecommerce`} />
                    <div className="ProductDetails">
                        <div >
                            <Carousel>
                                {
                                    product.images && product.images.map((item, i) => <img src={item.url} className='CarouselImage' key={item.url} alt={`Slide ${i}`} />)
                                }
                            </Carousel>
                        </div>
                        <div >
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <Rating {...options} />
                                <span className='.detailsBlock-2-span'>({product.numOfReviews} Reviews)</span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>Rs. {`${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity} >-</button>
                                        <input type="number" readOnly value={quantity} />
                                        <button onClick={increaseQuantity} >+</button>
                                    </div>
                                    <button disabled={product.stock < 1 ? true : false} onClick={addToCartHandler} >Add to Cart</button>
                                </div>
                                <p>Status : <b className={product.stock < 1 ? "redColor" : "greenColor"} >
                                    {product.stock < 1 ? "OutOfStock" : "In Stock"}
                                </b></p>
                            </div>
                            <div className="detailsBlock-4">
                                Description : <p>{product.description}</p>
                            </div>
                            <button className='submitReview' onClick={submitReviewToggle} >Submit Review</button>
                        </div>
                    </div>
                    <h3 className="reviewsHeading">Reviews...</h3>
                    <Dialog aria-label='simple-dialog-title' open={open} onClose={submitReviewToggle}  >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className='submitDialog' >
                            <Rating value={rating} size={"large"} onChange={(e) => setRating(e.target.value)} />
                            <textarea className='submitDialogueTextArea' cols={'30'} rows={'5'} value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color='secondary'>Cancel</Button>
                            <Button onClick={reviewSubmitHandler} color='primary'  >Submit</Button>
                        </DialogActions>
                    </Dialog>
                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews.map((review) => <ReviewCard review={review} />)}

                        </div>
                    ) : <h3 className='noReview' >No Reviews Yet...</h3>}
                </Fragment>
            }
        </Fragment>
    )
}
export default ProductDetails