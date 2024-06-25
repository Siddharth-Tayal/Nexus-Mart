import { ADMIN_ORDER_DELETE_FAIL, ADMIN_ORDER_DELETE_REQUEST, ADMIN_ORDER_DELETE_SUCCESS, ADMIN_ORDER_LIST_FAIL, ADMIN_ORDER_LIST_REQUEST, ADMIN_ORDER_LIST_SUCCESS, ADMIN_ORDER_UPDATE_FAIL, ADMIN_ORDER_UPDATE_REQUEST, ADMIN_ORDER_UPDATE_SUCCESS, CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, ORDER_DETAIL_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS } from "../constants/orderConstants";
import axios from "axios";

// Create order
export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post("/api/v1/neworder", order, config);
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }
}

// My Orders
export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST });

        const { data } = await axios.get("/api/v1/orders/me");
        dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }
}
// Order Details
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAIL_REQUEST });

        const { data } = await axios.get(`/api/v1/order/${id}`);
        dispatch({ type: ORDER_DETAIL_SUCCESS, payload: data.order });
    } catch (error) {
        dispatch({
            type: ORDER_DETAIL_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Admin Actions
export const allOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_ORDER_LIST_REQUEST });

        const { data } = await axios.get("/api/v1/admin/orders/all");
        dispatch({ type: ADMIN_ORDER_LIST_SUCCESS, payload: data.orders });
    } catch (error) {
        dispatch({
            type: ADMIN_ORDER_LIST_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Update Order
export const updateOrder = (id, order) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_ORDER_UPDATE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(`/api/v1/admin/order/${id}`, order, config);

        dispatch({ type: ADMIN_ORDER_UPDATE_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: ADMIN_ORDER_UPDATE_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_ORDER_DELETE_REQUEST });


        const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

        dispatch({ type: ADMIN_ORDER_DELETE_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: ADMIN_ORDER_DELETE_FAIL,
            payload: error.response.data.message,
        })
    }
}
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}