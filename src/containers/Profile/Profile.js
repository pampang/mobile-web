import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as actions from './reducer/actions';
import autobind from 'react-autobind';
import styles from './style.scss';

const mapStateToProps = (state) => {
  // 仅仅绑定所需的state
  return {
    profile: state.profile,
  }
}

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

class Profile extends Component {
  state = {

  };

  constructor() {
    super();
    autobind(this);
  }

  render() {
    return (
      <div className={styles.profile}>
        <div className={styles.descInfo}>
          <div className={styles.avatar}>
            <span className={styles.avatarImg}>
            </span>
          </div>
          <div className={styles.avatarText}>
            <div className={styles.avatarName}>曾程乐</div>
            <div className={styles.avatarPhone}>13560324350</div>
          </div>
          <div className={styles.limit}>
            <div className={styles.canUse}>
              <div className={styles.canUseText}>可用额度(元)</div>
              <div className={styles.canUseNumber}>40,000.5</div>
            </div>
            <div className={styles.limitGap}>
            </div>
            <div className={styles.used}>
              <div className={styles.usedText}>已用额度(元)</div>
              <div className={styles.usedNumber}>40,000.5</div>
            </div>
          </div>
        </div>

        <div className={styles.auth}>
          <h2 className={styles.authTitle}>完成下列认证，获取信用额度</h2>
          <div className={styles.authImgs}>
            <div className={styles.authRealNameImg}>
              <div className={styles.authItem}>
                <div className={styles.authRealName}></div>
                <h5 className={styles.authRealNameText}>实名认证</h5>
              </div>
            </div>
            <div className={styles.authUnionpayImg}>
              <div className={styles.authItem}>
                <div className={styles.authUnionpay}></div>
                <h5 className={styles.authUnionpayText}>银联认证</h5>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.operateList}>
          <div className={styles.operateItem}>
            <div className={styles.operateIcon}>
              <span className={`${styles.iconOrder}`}></span>
            </div>
            <div className={styles.operateTitle}>我的订单<i className={styles.iconArrow}></i></div>
          </div>
          <div className={styles.operateItem}>
            <div className={styles.operateIcon}>
              <span className={`${styles.iconCoupon}`}></span>
            </div>
            <div className={styles.operateTitle}>我的优惠券<i className={styles.iconArrow}></i></div>
          </div>
          <div className={styles.operateItem}>
            <div className={styles.operateIcon}>
              <span className={`${styles.iconQuestion}`}></span>
            </div>
            <div className={styles.operateTitle}>常见问题<i className={styles.iconArrow}></i></div>
          </div>
        </div>

        <div className={styles.operateList}>
          <div className={`${styles.operateItem} ${styles.logoutItem}`}>
            <div className={styles.operateTitle}>退出登录</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
