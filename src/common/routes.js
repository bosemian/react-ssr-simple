import React from 'react';
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { PostsIndex, PostsNew, PostsShow } from './containers';
import { Header } from './components/'

export default(store, history) => {
    return (
        <Router history={syncHistoryWithStore(history, store)}>
            <Route path='/' component={Header}>
                <IndexRoute component={PostsIndex} />
                <route path='posts'>
                    <route path="new" component={PostsNew} />
                    <route path=":id" component={PostsShow} />
                </route>
            </Route>
        </Router>
    )
}


