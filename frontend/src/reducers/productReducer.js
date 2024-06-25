import { ALL_PRODUCT_FAIL, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQUEST, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, CLEAR_ERRORS, ADD_REVIEW_REQUEST, ADD_REVIEW_SUCCESS, ADD_REVIEW_FAIL, ADD_REVIEW_RESET, ADMIN_PRODUCT_LIST_REQUEST, ADMIN_PRODUCT_LIST_FAIL, ADMIN_PRODUCT_LIST_SUCCESS, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL, CREATE_PRODUCT_RESET, ADMIN_PRODUCT_DELETE_REQUEST, ADMIN_PRODUCT_DELETE_SUCCESS, ADMIN_PRODUCT_DELETE_FAIL, ADMIN_PRODUCT_DELETE_RESET, ADMIN_PRODUCT_UPDATE_REQUEST, ADMIN_PRODUCT_UPDATE_SUCCESS, ADMIN_PRODUCT_UPDATE_FAIL, ADMIN_PRODUCT_UPDATE_RESET, ADMIN_PRODUCT_REVIEWS_FAIL, ADMIN_PRODUCT_REVIEWS_SUCCESS, ADMIN_PRODUCT_REVIEWS_REQUEST, ADMIN_REVIEW_DELETE_REQUEST, ADMIN_REVIEW_DELETE_SUCCESS, ADMIN_REVIEW_DELETE_FAIL, ADMIN_REVIEW_DELETE_RESET } from "../constants/productConstants"

export const productReducer = (state = { products: [] }, action) => {

    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_LIST_REQUEST:
            return {
                loading: true,
                products: []
            };

        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resultPerPage: action.payload.resultPerPage,
                filteredProductsCount: action.payload.filteredProductsCount,
            };

        case ADMIN_PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload,
            };

        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }

}

export const productDetailReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            };

        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload,
            };

        case PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}


export const newProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case CREATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case CREATE_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product
            };

        case CREATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CREATE_PRODUCT_RESET:
            return {
                ...state,
                loading: false,
                success: false
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

export const deleteProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case ADMIN_PRODUCT_DELETE_REQUEST:
        case ADMIN_PRODUCT_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ADMIN_PRODUCT_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            };

        case ADMIN_PRODUCT_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };

        case ADMIN_PRODUCT_DELETE_FAIL:
        case ADMIN_PRODUCT_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ADMIN_PRODUCT_DELETE_RESET:
            return {
                ...state,
                loading: false,
                isDeleted: false
            };

        case ADMIN_PRODUCT_UPDATE_RESET:
            return {
                ...state,
                loading: false,
                isUpdated: false
            };


        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}


export const updateProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case ADMIN_PRODUCT_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ADMIN_PRODUCT_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };

        case ADMIN_PRODUCT_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ADMIN_PRODUCT_UPDATE_RESET:
            return {
                ...state,
                loading: false,
                isUpdated: false
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}
export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ADD_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload,
            };

        case ADD_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ADD_REVIEW_RESET:
            return {
                ...state,
                loading: false,
                success: false
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}


export const allReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case ADMIN_PRODUCT_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ADMIN_PRODUCT_REVIEWS_SUCCESS:
            return {
                loading: false,
                reviews: action.payload,
            };

        case ADMIN_PRODUCT_REVIEWS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}


export const deleteReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_REVIEW_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ADMIN_REVIEW_DELETE_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload,
            };

        case ADMIN_REVIEW_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ADMIN_REVIEW_DELETE_RESET:
            return {
                ...state,
                loading: false,
                isDeleted: false
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}
