import React, { Fragment, useEffect } from 'react'
import { CgMouse } from "react-icons/cg"
import "./Home.css"
import MetaData from '../layout/MetaData'
import ProductCard from "./ProductCard.js"
import { clearErrors, getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from "react-redux"
import { useAlert } from "react-alert"
import Loader from '../layout/Loader/loader';
const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products);
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(getProduct())
    }, [dispatch, error, alert])

    return (
        <Fragment>
            {
                loading ? < Loader /> : <Fragment>
                    <MetaData title={"ClickCraze"} />
                    <div className="banner">
                        <p>NexusMart</p>
                        <h1>Find amazing product below</h1>
                        <a href="#container">
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div>


                    <h2 className="homeheading">
                        Featured products
                    </h2>
                    <div className="container" id='container' >
                        {
                            products && products.map(product => (
                                <ProductCard product={product} key={product._id} />
                            ))
                        }
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

export default Home