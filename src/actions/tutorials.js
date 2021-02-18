import {GET_TUTORIALS,GET_TUTORIALS_SUCCESS,GET_TUTORIALS_FAIL} from '../constants';

export const getTutorialsRequest = () => {
    return async dispatch => {
        try {
            dispatch({type: GET_TUTORIALS, loading: true});
            const data = await fetch('http://192.168.100.27:8080/api/tutorials');
            const tutorials = await data.json();
            console.log('tutorials-----------', tutorials);
            dispatch({type: GET_TUTORIALS_SUCCESS, payload: tutorials.tutorials, loading: false})
        } catch(error) {
            console.log('Getting Tutorials Error---------', error);
            dispatch({type: GET_TUTORIALS_FAIL, payload: error, loading: false})
        }
    }
}
