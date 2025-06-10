import axios from 'axios';
import {GET_INVENTORY} from './type';

var _= require('lodash');

// Read Inventory Action
export const getInventory = () => dispatch => {
    axios.post('http://127.0.0.1:5000/read',{}, {
        data: {
        },
        headers: {
            'content-type':'application/json;charset=UTF-8'
        }
    })
    .then(res => {
        if (!_.isNil(res.data))
            dispatch(setInventory(res.data));
    })
    .catch(err => {
        if (!_.isNil(err))
            dispatch(setInventory({}));
    })
}

export const setInventory = data => {
    return{
        type: GET_INVENTORY,
        payload: data
    }
}

