import React, { Fragment, useState } from 'react'
import MetaData from '../layout/MetaData'
import { useNavigate } from 'react-router'
import "./search.css"
const Search = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const searchSubmitHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        }
        else {
            navigate(`/products`);
        }
    }
    return (
        <Fragment>
            <MetaData title={"Search --Ecommerce"} />
            <form className='searchBox' onSubmit={searchSubmitHandler}>
                <input type='text' placeholder='Search a product...' onChange={(e) => setKeyword(e.target.value)} />
                <input type='submit' value={"Search"} />
            </form>
        </Fragment>
    )
}

export default Search