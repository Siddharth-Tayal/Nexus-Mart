import React from 'react'
import { Rating } from '@material-ui/lab'
import Profile from "../../images/profile.png"
import "./ProductDetails.css"
const ReviewCard = ({ review }) => {


    const options = {
        readOnly: true,
        precision: 0.5,
        value: review.rating,
    }

    return <div className="reviewCard">
        <img src={Profile} alt="" />
        <p>{review.name}</p>
        <Rating {...options} />
        <span className='reviewCard-span' >{review.comment}</span>
    </div>
}

export default ReviewCard