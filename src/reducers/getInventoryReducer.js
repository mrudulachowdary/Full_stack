import { GET_INVENTORY } from '../actions/type';

const initialState = {
    getInventoryList: null
}

// set inventory list
export default function(state = initialState, action){
    switch(action.type){
        case GET_INVENTORY:
            return {
                ...state,
                getInventoryList: action.payload
            };
        default:
            return state;
    }
}