/*
* @Author: PAMPANG
* @Date:   2016-09-13 10:01:01
* @Last Modified by:   PAMPANG
* @Last Modified time: 2016-09-13 14:29:16
*/

'use strict';
import { injectReducer } from '../../store/reducers';
import Profile from './Profile';

export default (store) => {
  return {
    path : 'profile',
    /*  Async getComponent is only invoked when route matches   */
    getComponent (nextState, cb) {
      /*  Webpack - use 'require.ensure' to create a split point
          and embed an async module loader (jsonp) when bundling   */
      require.ensure([], (require) => {
        // state, action, reducer
        const reducer = require('./reducer/reducer').default;
        injectReducer(store, { key: 'profile', reducer })

        /*  Return getComponent   */
        cb(null, Profile)

      /* Webpack named bundle   */
      }, 'profile')
    }
  }
}
