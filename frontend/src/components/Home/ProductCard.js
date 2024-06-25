import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from '@material-ui/lab'

const ProductCard = ({ product }) => {

    const options = {
        precision: true,
        readOnly: true,
        value: product.ratings,
    }

    return <Link className='productCard' to={`/product/${product._id}`} >
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div className="">
            <Rating {...options} /><span className='productCard-div-span' >({product.numOfReviews} Reviews)</span>
        </div>
        <span>Rs. {product.price}</span>
    </Link>
}

export default ProductCard;