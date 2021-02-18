import {GET_TUTORIALS,GET_TUTORIALS_SUCCESS,GET_TUTORIALS_FAIL} from '../constants';

const initialState = {
    //Have a people array responsible for getting the data and setting to the array.
    data: [],
    //Have the loading state indicate if it's done getting data.
    loading: true,
    //Have state for error message for recieving an error.
    errorMessage: '',
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_TUTORIALS:
            return {...state, loading: action.loading};
        case GET_TUTORIALS_SUCCESS:
            return {...state, data: action.payload, loading: action.loading};
        case GET_TUTORIALS_FAIL:
            return {...state, errorMessage: action.payload, loading: action.loading};
        default:
            return state;
    }
};
