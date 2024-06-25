import ProductCard from '../Home/ProductCard';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from "react-redux"
import { useAlert } from "react-alert"
import Loader from '../layout/Loader/loader';
import Pagination from "react-js-pagination"
import { useParams } from 'react-router-dom';
import { useEffect, Fragment, useState } from 'react';
import Slider from "@material-ui/core/Slider"
import { Typography } from '@material-ui/core';
import "./Product.css"
import MetaData from "../layout/MetaData"

const categories = ["laptop", "Footwear", "Bottom", "top", "Attire", "Camera", "Smart Phones"];
const Products = () => {

    const [category, setCategory] = useState("");

    const params = useParams();
    const keyword = params.keyword;


    const alert = useAlert();
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [rating, setRating] = useState(0);


    const priceHandler = (e, newPrice) => {
        setPrice(newPrice);
    }
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }
    const ratingHandler = (e, newRating) => {
        setRating(newRating);
    }
    const { loading, error, products, productsCount, resultPerPage, filteredProductsCount } = useSelector(state => state.products);


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(getProduct(keyword, currentPage, price, category, rating))
    }, [dispatch, error, alert, keyword, currentPage, price, category, rating])

    let count = filteredProductsCount;
    return <Fragment>
        {
            loading ? <Loader /> : <Fragment>
                <MetaData title={"Products -- Ecommerce"} />
                <h2 className="productHeading">
                    All Products
                </h2>
                <div className="products" >
                    {
                        products && products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    }
                </div>
                {
                    keyword &&
                    <div className="filterBox">

                        <Typography>Price</Typography>
                        <Slider value={price} onChange={priceHandler} valueLabelDisplay='auto' aria-labelledby='range-slider'
                            min={0} max={25000}  ></Slider>
                        <Typography>Categories</Typography>
                        <ul className='categoryBox' >
                            {
                                categories.map((category) => (
                                    <li
                                        className='category-link' key={category} onClick={() => setCategory(category)}>
                                        {category}
                                    </li>)
                                )
                            }
                        </ul>
                        <fieldset>
                            <Typography component={"legend"} >Ratings</Typography>
                            <Slider value={rating} onChange={ratingHandler} valueLabelDisplay='auto' aria-labelledby='continous-slider'
                                min={0} max={5}  ></Slider>
                        </fieldset>
                    </div>
                }
                {
                    resultPerPage < count && (

                        <div className="paginationBox">
                            <Pagination activePage={currentPage} itemsCountPerPage={resultPerPage} totalItemsCount={productsCount} onChange={setCurrentPageNo} prevPageText={"Prev"} nextPageText={"next"} firstPageText={'1st'} lastPageText={"Last"} itemClass='page-item' linkClass='page-link' activeClass='pageItemActive' activeLinkClass='pageLinkActive' />
                        </div>
                    )
                }
            </Fragment>
        }
    </Fragment >

}

export default Products;