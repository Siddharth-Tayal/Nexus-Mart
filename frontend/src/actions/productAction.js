import axios from "axios";
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQUEST, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, CLEAR_ERRORS, ADD_REVIEW_REQUEST, ADD_REVIEW_SUCCESS, ADD_REVIEW_FAIL, ADMIN_PRODUCT_LIST_REQUEST, ADMIN_PRODUCT_LIST_SUCCESS, ADMIN_PRODUCT_LIST_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL, ADMIN_PRODUCT_DELETE_REQUEST, ADMIN_PRODUCT_DELETE_SUCCESS, ADMIN_PRODUCT_DELETE_FAIL, ADMIN_PRODUCT_UPDATE_SUCCESS, ADMIN_PRODUCT_UPDATE_FAIL, ADMIN_PRODUCT_UPDATE_REQUEST, ADMIN_PRODUCT_REVIEWS_REQUEST, ADMIN_PRODUCT_REVIEWS_SUCCESS, ADMIN_PRODUCT_REVIEWS_FAIL, ADMIN_REVIEW_DELETE_REQUEST, ADMIN_REVIEW_DELETE_SUCCESS, ADMIN_REVIEW_DELETE_FAIL } from "../constants/productConstants"

export const getProduct = (keyword = "", currentPage = 1, price = [0, 25000], category, rating = 0) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCT_REQUEST,
        })
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`;
        if (category) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}&category=${category}`;
        }
        const { data } = await axios.get(link);
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}
// Product Detail
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST,
        })
        const { data } = await axios.get(`/api/v1/product/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}
// Review
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_REVIEW_REQUEST,
        })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const { data } = await axios.put(`/api/v1/review`, reviewData, config)
        dispatch({
            type: ADD_REVIEW_SUCCESS,
            payload: data.success,
        })

    } catch (error) {
        dispatch({
            type: ADD_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

//Admin get all products
export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_PRODUCT_LIST_REQUEST,
        })
        const { data } = await axios.get('/api/v1/admin/products');
        dispatch({
            type: ADMIN_PRODUCT_LIST_SUCCESS,
            payload: data.products,
        })

    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_LIST_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAllReviews = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_PRODUCT_REVIEWS_REQUEST,
        })
        const { data } = await axios.get(`/api/v1/review?id=${id}`);
        dispatch({
            type: ADMIN_PRODUCT_REVIEWS_SUCCESS,
            payload: data.review,
        })

    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_REVIEWS_FAIL,
            payload: error.response.data.message
        })
    }
}
export const deleteReview = (reviewId, productId) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_REVIEW_DELETE_REQUEST,
        })
        const { data } = await axios.delete(`/api/v1/review?id=${reviewId}&productId=${productId}`);
        dispatch({
            type: ADMIN_REVIEW_DELETE_SUCCESS,
            payload: data.success,
        })

    } catch (error) {
        dispatch({
            type: ADMIN_REVIEW_DELETE_FAIL,
            payload: error.response.data.message
        })
    }
}
//Create Product
export const newProduct = (productData) => async (dispatch) => {
    try {
        dispatch({
            type: CREATE_PRODUCT_REQUEST,
        })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const { data } = await axios.post(`/api/v1/admin/product/new`, productData, config)
        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: CREATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete Products

export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_PRODUCT_DELETE_REQUEST,
        })
        const { data } = await axios.delete(`/api/v1/admin/product/${id}`)
        dispatch({
            type: ADMIN_PRODUCT_DELETE_SUCCESS,
            payload: data.success,
        })

    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_DELETE_FAIL,
            payload: error.response.data.message
        })
    }
}

//update product
export const updateProduct = (id, updatedData) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_PRODUCT_UPDATE_REQUEST,
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const { data } = await axios.put(`/api/v1/admin/product/${id}`, updatedData, config)
        dispatch({
            type: ADMIN_PRODUCT_UPDATE_SUCCESS,
            payload: data.success,
        })

    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_UPDATE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {

    dispatch({
        type: CLEAR_ERRORS,
    })
}
