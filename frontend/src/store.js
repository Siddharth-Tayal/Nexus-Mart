import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { allReviewsReducer, deleteProductReducer, deleteReviewReducer, newProductReducer, newReviewReducer, productDetailReducer, productReducer } from "./reducers/productReducer";
import { allUsersReducer, forgotPasswordReducer, profileReducer, updateDeleteUserReducer, userDetailReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, updateDeleteOrderReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
    user: userReducer,
    allUsers: allUsersReducer,
    userEdit: updateDeleteUserReducer,
    userDetails: userDetailReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,


    newProduct: newProductReducer,
    deleteProduct: deleteProductReducer,
    products: productReducer,
    productDetails: productDetailReducer,

    cart: cartReducer,

    newReview: newReviewReducer,
    allReview: allReviewsReducer,
    deleteReview: deleteReviewReducer,

    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    allOrders: allOrdersReducer,
    updateDeleteOrder: updateDeleteOrderReducer,
});
let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {},
    }

};
const middlerware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlerware)));
export default store;