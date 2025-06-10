import axios from 'axios';
import {UPDATE_INVENTORY} from './type';

var _= require('lodash');

// Update Inventory Action
export const updateInventoryData = data => async dispatch => {
    await axios.post('http://127.0.0.1:5000/update',{
        data: { data },
        headers: {
            'content-type':'application/json;charset=UTF-8'
        }
    })
    .then(res => {
        if (!_.isNil(res.data))
            return dispatch(updateInventoryRes(res.data));
        else
            return dispatch(updateInventoryRes('FAILURE'));
    })
    .catch(err => {
        return dispatch(updateInventoryRes('FAILURE'));
    })
}

export const updateInventoryRes = data => {
    return{
        type: UPDATE_INVENTORY,
        payload: data
    }
}

