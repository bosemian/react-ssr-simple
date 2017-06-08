import React from 'react';
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import configureStore from '../common/store/configureStore'
import createMemoryHistory from 'react-router/lib/createMemoryHistory'
import { syncHistoryWithStore } from 'react-router-redux'
import { match, RouterContext } from 'react-router'
import routes from '../common/routes'

import Root from '../common/containers/Root'
import { fetchComponent } from './fetchComponent.js'

const renderHtml = (html, initialState) => (`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset='utf-8'>
      <title>Blog!</title>
    </head>
    <body>
      <div id='app'>${html}</div>

      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
      </script>
      
      <script src='http://127.0.0.1:8081/dist/bundle.js'></script>
    </body>
  </html>
`)

export default function(req, res) {
  const memoryHistory = createMemoryHistory(req.originalUrl)
  const store = configureStore(memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)

  match({
    routes: routes(store, history),
    location: req.originalUrl
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`)
    } else if (renderProps) {

      const { components, params } = renderProps

      fetchComponent(store.dispatch, components, params)
        .then(html => {
          const componentHTML = renderToString(
            <Provider store={store} key='provider'>
              <RouterContext {...renderProps} />
            </Provider>
          )
          const initialState = store.getState()

          res.status(200).send(
            renderHtml(componentHTML, initialState)
          )
          
          console.log('success 200')
        })
        .catch(error => {
          console.log(error)
          res.status(500).send('Internal Server Error')
        })
    } else {
      res.status(404).send('Not found')
    }
  })
}