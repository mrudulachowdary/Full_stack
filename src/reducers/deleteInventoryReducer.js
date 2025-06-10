import { DELETE_INVENTORY } from '../actions/type';

const initialState = {
    deleteInventoryResList: null
}

// set delete inventory response
export default function(state = initialState, action){
    switch(action.type){
        case DELETE_INVENTORY:
            return {
                ...state,
                deleteInventoryResList: action.payload
            };
        default:
            return state;
    }
}