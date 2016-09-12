import { injectReducer } from './store/reducers';

// We only need to import the modules necessary for initial render
import CoreLayout from './layouts/CoreLayout/CoreLayout'
import Home from './containers/Home'
import Counter from './containers/Counter/Counter'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes : [
    // CounterRoute(store)
    {
      path : 'counter',
      /*  Async getComponent is only invoked when route matches   */
      getComponent (nextState, cb) {
        /*  Webpack - use 'require.ensure' to create a split point
            and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
          /*  Webpack - use require callback to define
              dependencies for bundling   */
          const Counter = require('./containers/Counter/Counter').default
          // state, action, reducer
          // const reducer = require('./modules/counter').default
          const reducer = require('./containers/Counter/reducer').default;

          console.log(reducer);

          /*  Add the reducer to the store on key 'counter'  */
          injectReducer(store, { key: 'counter', reducer })

          /*  Return getComponent   */
          cb(null, Counter)

        /* Webpack named bundle   */
        }, 'counter')
      }
    }
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
