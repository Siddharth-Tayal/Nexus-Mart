import { ALL_USERS_FAILS, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_RESET, CHANGE_PASSWORD_SUCCESS, CLEAR_ERRORS, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_RESET, UPDATE_PROFILE_SUCCESS, USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_RESET, USER_DELETE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_RESET, USER_UPDATE_SUCCESS, UUSER_DETAIL_FAIL, UUSER_DETAIL_REQUEST, UUSER_DETAIL_SUCCESS } from "../constants/userConstant";

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        case LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
            }

        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
        case CHANGE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,

            };
        case UPDATE_PROFILE_SUCCESS:
        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case UPDATE_PROFILE_FAIL:
        case CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case UPDATE_PROFILE_RESET:
        case CHANGE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
            }

        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}



export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload,
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
            }
        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}



// ADMIN REDUCERS


export const userDetailReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case UUSER_DETAIL_REQUEST:
            return {
                loading: true,
            };
        case UUSER_DETAIL_SUCCESS:
            return {
                loading: false,
                user: action.payload,
            }
        case UUSER_DETAIL_FAIL:
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

export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case ALL_USERS_REQUEST:
            return {
                loading: true,
            };
        case ALL_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload.users,
            }
        case ALL_USERS_FAILS:
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


export const updateDeleteUserReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
        case USER_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case USER_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            }
        case USER_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            }
        case USER_UPDATE_FAIL:
        case USER_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case USER_UPDATE_RESET:
            return {
                ...state,
                loading: false,
                isUpdated: false,
            }
        case USER_DELETE_RESET:
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