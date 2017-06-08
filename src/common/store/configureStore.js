import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { logger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux'

import rootReducer from '../reducers';

export default (history, initialState) => {
    const middlewares = [thunk, routerMiddleware(history)]
    
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(logger);
    }

    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middlewares)
    )

    //const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducers, initialState);

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            System.import('../reducers').then(nextRootReducer =>
                store.replaceReducer(nextRootReducer.default)
            )
        })
    }

    
    return store
   
}