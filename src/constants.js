export const GET_USERS = 'GET_USERS';
//Gets the users on api call is fullfilled
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
//When there is a error return an error action type.
export const GET_USERS_FAIL = 'GET_USERS_FAIL';

//Gets the next page of users
export const GET_MORE_USERS = 'GET_MORE_USERS';
//Gets the next page of users on api call is fullfilled
export const GET_MORE_USERS_SUCCESS = 'GET_MORE_USERS_SUCCESS';
//When there is an error on getting the next page of users return an error action type.
export const GET_MORE_USERS_FAIL = 'GET_MORE_USERS_FAIL';

export const GET_TUTORIALS = 'GET_TUTORIALS';
export const GET_TUTORIALS_SUCCESS = 'GET_TUTORIALS_SUCCESS';
export const GET_TUTORIALS_FAIL = 'GET_TUTORIALS_FAIL';

// Creating new user at DB
export const ADD_USER = 'ADD_USER';
// New user created successfully
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
// Some error occurred while creating new user  error
export const ADD_USER_FAIL = 'ADD_USER_FAIL';

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';


export const FIND_USER_BY_LOGIN = 'FIND_USER_LOGIN_USER';
export const FIND_USER_BY_LOGIN_SUCCESS = 'FIND_USER_LOGIN_SUCCESS';
export const FIND_USER_BY_LOGIN_FAIL = 'FIND_USER_LOGIN_FAIL';

// Initializing of User state
export const INIT_USER_STATE = 'INIT_USER_STATE'

// Initializing of Data state
export const INIT_DATA_STATE = 'INIT_DATA_STATE'

// Updating of userToPush state
export const UPDATE_USERTOPUSH= 'UPDATE_USERTOPUSH'

// Updating of userImgToPush state
export const UPDATE_USERIMGTOPUSH= 'UPDATE_USERIMGTOPUSH'
