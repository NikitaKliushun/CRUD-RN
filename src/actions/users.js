import {
            GET_USERS_FAIL,
            GET_USERS_SUCCESS,
            GET_USERS,
            GET_MORE_USERS,
            GET_MORE_USERS_SUCCESS,
            GET_MORE_USERS_FAIL,
            ADD_USER,
            ADD_USER_FAIL,
            ADD_USER_SUCCESS,
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
import axios from 'axios';

export const getUsersRequest = (usersPage) => {
    return async dispatch => {
        try {
            dispatch({type: GET_USERS, loading: true});
            const data = await fetch(`http://192.168.100.27:8080/api/users?size=15&page=${usersPage}`);
            const users = await data.json();
            console.log('users-----------', users, data);
            dispatch({type: GET_USERS_SUCCESS, payload: users.users, totalUsersPages: users.totalPages, loading: false})
        } catch(error) {
            console.log('Getting Users Error---------', error);
            dispatch({type: GET_USERS_FAIL, payload: error, loading: false})
        }
    }
}

export const getMoreUsersRequest = (usersPage) => {
    return async dispatch => {
        try {
            dispatch({type: GET_MORE_USERS, usersPage: usersPage, moreUsersLoading: true});
            const data = await fetch(`http://192.168.100.27:8080/api/users?size=15&page=${usersPage}`);
            const users = await data.json();
            console.log('More Users-----------', users, data);
            dispatch({type: GET_MORE_USERS_SUCCESS, payload: users.users, moreUsersLoading: false})
        } catch(error) {
            console.log('Getting More Users Error---------', error);
            dispatch({type: GET_MORE_USERS_FAIL, payload: error, moreUsersLoading: false})
        }
    }
}

export const addUserRequest = (userData) => {
    return async dispatch => {
        try {
            console.log('userData at action',userData);
            dispatch({type: ADD_USER, loading: true});
            const data = await axios.post('http://192.168.100.27:8080/api/users', userData);
            //const data = await fetch('http://192.168.100.27:8080/api/users', userData);
          //  const responseAPI = await data.json();
          //  console.log('responseAPI',responseAPI);
          //  console.log('responseAPI-----------', responseAPI);
            dispatch({type: ADD_USER_SUCCESS, loading: false})
        } catch(error) {
            console.log('Adding User Error---------', error);
            dispatch({type: ADD_USER_FAIL, payload: error, loading: false})
        }
    }
}

export const updateUserRequest = (userID, userData) => {

    return async dispatch => {
        try {
            dispatch({type: UPDATE_USER, loading: true});
            const data = await axios.put(`http://192.168.100.27:8080/api/users/${userID}`,userData);
            dispatch({type: UPDATE_USER_SUCCESS, loading: false})
        } catch(error) {
            console.log('Updating User Error---------', error);
            dispatch({type: UPDATE_USER_FAIL, payload: error, loading: false})
        }
    }
}

export const findUserByLogin = (login) => {
    return async dispatch => {
        try {
            dispatch({type: FIND_USER_BY_LOGIN, loadingUser: true});
            const data = await fetch(`http://192.168.100.27:8080/api/users/login/${login}`);
            const user = await data.json();
            if (!data.ok) {
                throw new Error('Users with such login exist');
            }
            console.log('user-----------', user, data);
            dispatch({type: FIND_USER_BY_LOGIN_SUCCESS, payload: undefined, loadingUser: false})

        } catch(error) {
            console.log('Getting User Error---------', error);
            dispatch({type: FIND_USER_BY_LOGIN_FAIL, payload: true, loadingUser: false})
        }
    }
}

export const initUserState = {
    type: INIT_USER_STATE,
    payload: undefined,
    loadingUser: false,
    errorUser: true
}

export const initDataState = {
    type: INIT_DATA_STATE,
    payload: [],
    loading: true
}

export const updateUserToPush = (userData) => {
    return {type: UPDATE_USERTOPUSH, payload: userData};
}

export const updateUserImgToPush = (userImg) => {
    return {type: UPDATE_USERIMGTOPUSH, payload: userImg};
}
