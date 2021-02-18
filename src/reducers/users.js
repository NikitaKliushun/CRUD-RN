import {
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_FAIL,
    GET_MORE_USERS,
    GET_MORE_USERS_SUCCESS,
    GET_MORE_USERS_FAIL,
    ADD_USER,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    FIND_USER_BY_LOGIN,
    FIND_USER_BY_LOGIN_SUCCESS,
    FIND_USER_BY_LOGIN_FAIL,
    INIT_USER_STATE,
    INIT_DATA_STATE,
    UPDATE_USERTOPUSH,
    UPDATE_USERIMGTOPUSH,
} from '../constants';

const initialState = {
    //Have a users array responsible for getting the data and setting to the array.
    data: [],
    // Have a number of all users in DB
    totalUsersPages: undefined,
    //Have the loading state indicate if it's done getting data.
    loading: true,
    //Have state for error message for recieving an error.
    errorMessage: '',
    // Have the loading state indicate if it's done getting more users.
    moreUsersLoading: false,
    // Have the number of user's page, which is donwloading now (starts from 0)
    usersPage: undefined,
    // Field for getting user by login or ID
    user: undefined,
    // Field indicates the loading of getting User request
    loadingUser: false,
    // Field indicates the error of getting User request
    errorUser: false,
    // Field stores user data that will be created / updated on DB
    userToPush: undefined,
    // Field stores user image that will be created / updated on DB
    userImgToPush: undefined,
    // Field indicates the loading of updating User request
    userUpdateLoading: true,
    // Field indicates the error of updating User request
    userUpdateError: false,
    // Field indicates the loading of creating User request
    userCreateLoading: true,
    // Field indicates the error of creating User request
    userCreateError: false,
}


export default (state = initialState, action) => {
    switch(action.type) {
        case GET_USERS:
            return {...state, loading: action.loading};
        case GET_USERS_SUCCESS:
            return {...state, data: action.payload, totalUsersPages: action.totalUsersPages, loading: action.loading};
        case GET_USERS_FAIL:
            return {...state, errorMessage: action.payload, loading: action.loading};
        case GET_MORE_USERS:
            return {...state, usersPage: action.usersPage, moreUsersLoading: action.loading};
        case GET_MORE_USERS_SUCCESS:
        {
            console.log('state.usersPage----',state.usersPage)
            if (state.usersPage === 0) return {...state, data: action.payload, moreUsersLoading: action.loading};
            else return {...state, data: [...state.data, ...action.payload], moreUsersLoading: action.loading};
        }
        case GET_MORE_USERS_FAIL:
            return {...state, errorMessage: action.payload, moreUsersLoading: action.loading};
        case ADD_USER:
            return {...state, userCreateLoading: action.loading, userCreateError: false};
        case ADD_USER_SUCCESS:
            return {...state, userCreateLoading: action.loading, userCreateError: false};
        case ADD_USER_FAIL:
            return {...state, userCreateError: action.payload, userCreateLoading: action.loading};
        case UPDATE_USER:
            return {...state, userUpdateLoading: action.loading};
        case UPDATE_USER_SUCCESS:
            return {...state, userUpdateLoading: action.loading, userUpdateError: false};
        case UPDATE_USER_FAIL:
            return {...state, userUpdateError: action.payload, userUpdateLoading: action.loading};
        case FIND_USER_BY_LOGIN:
            return {...state, loadingUser: action.loadingUser, errorUser: true};
        case FIND_USER_BY_LOGIN_SUCCESS:
            return {...state, user: true, loadingUser: action.loadingUser, errorUser: false};
        case FIND_USER_BY_LOGIN_FAIL:
            return {...state, errorUser: action.payload, loadingUser: action.loadingUser, user: false};
        case INIT_USER_STATE:
            return {...state, user: action.payload, loadingUser: action.loadingUser, errorUser: action.errorUser }
        case INIT_DATA_STATE:
            return {...state, data: action.payload, loading: action.loading }
        case UPDATE_USERTOPUSH:
            return {...state, userToPush: action.payload }
        case UPDATE_USERIMGTOPUSH:
            return {...state, userImgToPush: action.payload }
        default:
            return state;
    }
};
