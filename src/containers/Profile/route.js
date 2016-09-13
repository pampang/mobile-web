/*
* @Author: PAMPANG
* @Date:   2016-09-13 10:01:01
* @Last Modified by:   PAMPANG
* @Last Modified time: 2016-09-13 16:00:25
*/

'use strict';
import { injectReducer } from '../../store/reducers';
import Profile from './Profile';
import reducer from './reducer/reducer';

export default (store) => {
  return {
    path : 'profile',
    /*  Async getComponent is only invoked when route matches   */
    getComponent (nextState, cb) {
      // 当组件被初始化的时候，才将当前的reducer加载到store中，
      // 实现按需加载。
      injectReducer(store, { key: 'profile', reducer });
      cb(null, Profile);
    }
  }
}
