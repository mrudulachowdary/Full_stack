import { CREATE_INVENTORY } from '../actions/type';

const initialState = {
    createInventoryResList: null
}

// set create inventory response
export default function(state = initialState, action){
    switch(action.type){
        case CREATE_INVENTORY:
            return {
                ...state,
                createInventoryResList: action.payload
            };
        default:
            return state;
    }
}