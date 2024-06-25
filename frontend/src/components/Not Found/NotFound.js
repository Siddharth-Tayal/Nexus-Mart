import React from 'react'
import "./NotFound.css"
import { ErrorOutlineSharp } from "@material-ui/icons"
const NotFound = () => {
    return (
        <div className='notFound'>
            <ErrorOutlineSharp />
            <h1>404  Not Found</h1>
        </div>
    )
}

export default NotFound