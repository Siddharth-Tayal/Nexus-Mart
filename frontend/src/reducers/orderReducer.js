import { ADMIN_ORDER_DELETE_FAIL, ADMIN_ORDER_DELETE_REQUEST, ADMIN_ORDER_DELETE_RESET, ADMIN_ORDER_DELETE_SUCCESS, ADMIN_ORDER_LIST_FAIL, ADMIN_ORDER_LIST_REQUEST, ADMIN_ORDER_LIST_SUCCESS, ADMIN_ORDER_UPDATE_FAIL, ADMIN_ORDER_UPDATE_REQUEST, ADMIN_ORDER_UPDATE_RESET, ADMIN_ORDER_UPDATE_SUCCESS, CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, ORDER_DETAIL_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS } from "../constants/orderConstants";


export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                loading: true,
            };
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            }
        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;

    }
}
export const myOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case MY_ORDERS_REQUEST:
            return {
                loading: true,
            };
        case MY_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            }
        case MY_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;

    }
}
export const orderDetailsReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAIL_REQUEST:
            return {
                loading: true,
            };
        case ORDER_DETAIL_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            }
        case ORDER_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;

    }
}

// ADMIN REDUCERS

export const allOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ADMIN_ORDER_LIST_REQUEST:
            return {
                loading: true,
            };
        case ADMIN_ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            }
        case ADMIN_ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;

    }
}
export const updateDeleteOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_ORDER_UPDATE_REQUEST:
        case ADMIN_ORDER_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADMIN_ORDER_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            }
        case ADMIN_ORDER_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            }
        case ADMIN_ORDER_UPDATE_FAIL:
        case ADMIN_ORDER_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case ADMIN_ORDER_UPDATE_RESET:
            return {
                ...state,
                loading: false,
                isUpdated: false,
            }
        case ADMIN_ORDER_DELETE_RESET:
            return {
                ...state,
                loading: false,
                isDeleted: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;

    }
}