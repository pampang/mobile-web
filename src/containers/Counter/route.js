/*
* @Author: PAMPANG
* @Date:   2016-09-13 10:01:01
* @Last Modified by:   PAMPANG
* @Last Modified time: 2016-09-13 10:10:32
*/

'use strict';
import { injectReducer } from '../../store/reducers';

export default (store) => {
  return {
    path : 'counter',
    /*  Async getComponent is only invoked when route matches   */
    getComponent (nextState, cb) {
      /*  Webpack - use 'require.ensure' to create a split point
          and embed an async module loader (jsonp) when bundling   */
      require.ensure([], (require) => {
        /*  Webpack - use require callback to define
            dependencies for bundling   */
        const Counter = require('./Counter').default
        // state, action, reducer
        const reducer = require('./reducer/reducer').default;

        console.log(reducer);

        /*  Add the reducer to the store on key 'counter'  */
        injectReducer(store, { key: 'counter', reducer })

        /*  Return getComponent   */
        cb(null, Counter)

      /* Webpack named bundle   */
      }, 'counter')
    }
  }
}
