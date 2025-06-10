import axios from 'axios';
import {DELETE_INVENTORY} from './type';

var _= require('lodash');

// Delete inventory Action
export const deleteInventoryData = data => async dispatch => {
    await axios.post('http://127.0.0.1:5000/delete',{
        data: { data },
        headers: {
            'content-type':'application/json;charset=UTF-8'
        }
    })
    .then(res => {
        if (!_.isNil(res.data))
            return dispatch(deleteInventoryRes(res.data));
        else
            return dispatch(deleteInventoryRes('FAILURE'));
    })
    .catch(err => {
        return dispatch(deleteInventoryRes('FAILURE'));
    })
}

export const deleteInventoryRes = data => {
    return{
        type: DELETE_INVENTORY,
        payload: data
    }
}

