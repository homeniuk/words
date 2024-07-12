import { combineReducers } from '@reduxjs/toolkit';
import usersReducer from './UserSlice';
import wordsReducer from './WordSlice';


const rootReducer = combineReducers({
    user: usersReducer,
    words: wordsReducer,
  });
  
export default rootReducer;