import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux'

import post from './post';


export default combineReducers({
    post,
    form: formReducer,
    routing: routerReducer
})