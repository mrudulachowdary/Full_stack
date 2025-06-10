import axios from 'axios';
import {CREATE_INVENTORY} from './type';

var _= require('lodash');

// Create Inventory Action
export const createInventoryData = data => async dispatch => {
    await axios.post('http://127.0.0.1:5000/create', {
        data: { data }, 
        headers: {
            'content-type':'application/json;charset=UTF-8'
        }
    })
    .then(res => {
        if (!_.isNil(res.data))
            return dispatch(createInventoryRes(res.data));
        else
            return dispatch(createInventoryRes('FAILURE'));
    })
    .catch(err => {
        return dispatch(createInventoryRes('FAILURE'));
    })
}

export const createInventoryRes = data => {
    return{
        type: CREATE_INVENTORY,
        payload: data
    }
}

