import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as actions from './reducer/actions'
import styles from './style.scss'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

// import Counter from 'components/Counter'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

// (Function)
// 必须返回一个纯对象
// 该回调函数必须返回一个纯对象，这个对象会与组件的 props 合并
const mapStateToProps = (state) => {
  // 仅仅绑定所需的state
  return {
    counter: state.counter,
  }
}

// (Object or Function)
// 如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，而且这个对象会与 Redux store 绑定在一起，其中所定义的方法名将作为属性名，合并到组件的 props 中。
// 如果传递的是一个函数，该函数将接收一个 dispatch 函数，然后由你来决定如何返回一个对象，这个对象通过 dispatch 函数与 action creator 以某种方式绑定在一起
const mapDispatchToProps = (dispatch) => {
  // dispatch是写在action里面的分配函数，负责分配任务给reducer去改变state
  let bindedActions = {};
  for (let key in actions) {
    // 通过bindActionCreators来实现action中dispatch的传入，这样就不必局限于当前的函数内。
    bindedActions[key] = bindActionCreators(actions[key], dispatch);
  }

  return {
    actions: bindedActions,
    dispatch,
  }
}

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */


class Counter extends Component {
  render () {
    return (
      <div>
        <h2 className={styles.counterContainer}>
          Counter:
          {' '}
          <span className={styles['counter--green']}>
            {this.props.counter}
          </span>
        </h2>
        <button className='btn btn-default' onClick={this.props.actions.increment}>
          Increment
        </button>
      </div>
    )
  }
}

Counter.propTypes = {
  counter     : React.PropTypes.number.isRequired,
  // doubleAsync : React.PropTypes.func.isRequired,
  // increment   : React.PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
