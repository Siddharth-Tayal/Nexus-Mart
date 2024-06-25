import { Typography } from '@material-ui/core';
import { RemoveShoppingCart } from '@material-ui/icons';
import React from 'react'
import { Link, useParams } from 'react-router-dom';
import MetaData from './MetaData';

const NoProduct = () => {
    const params = useParams();
    return (
        <div className="emptyCart">
            <MetaData title={"No Product Exist"} />
            <RemoveShoppingCart />
            <Typography>No Product with Product Id : <span>#{params.id}
            </span> exists. It may be Deleted From store</Typography>
            <Link to={'/products'} >View Products </Link>
        </div>
    )
}

export default NoProduct;