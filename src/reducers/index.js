import { combineReducers } from 'redux';
import getInventoryReducer from './getInventoryReducer'
import createInventoryResReducer from './createInventoryResReducer';
import updateInventoryResReducer from './updateInventoryResReducer';
import dd from './deleteInventoryReducer';
import deleteInventoryReducer from './deleteInventoryReducer';

const rootReducer = combineReducers({
    getInventoryList: getInventoryReducer,
    createInventoryResList: createInventoryResReducer,
    updateInventoryResList: updateInventoryResReducer,
    deleteInventoryResList: deleteInventoryReducer
});

export default rootReducer;