'use strict';

const rpc = require('@ninozhang/rpc');

exports.get = function*() {
  const productId = this.params.productId;

  const product = yield rpc.mall.product.get({
    data: {
      productId: productId
    },
    dataIn: 'response.body.data.product'
  });

  let brandId = product.brandId;
  const brand = yield rpc.mall.brand.get({
    data: {
      brandId: brandId
    },
    dataIn: 'response.body.data.brand'
  });

  const binding = yield rpc.comment.product.getBinding({
    data: {
      productId: productId
    },
    dataIn: 'response.body.data.binding'
  });
  const commentIds = binding && binding.commentIds && binding.commentIds.split(',') || [];
  const comments = [];
  for (let commentId of commentIds) {
    const comment = yield rpc.comment.product.get({
      data: {
        commentId: commentId
      },
      dataIn: 'response.body.data.comment'
    });
    const userId = comment.userId;
    const profile = yield rpc.user.profile.getByUserId({
      data: {
        userId: userId
      },
      dataIn: 'response.body.data.user.profile'
    });
    comment.user = {
      profile: {
        nickName: profile.nickName,
        realName: profile.realName,
        avatar: profile.avatar,
        tags: profile.tags,
        certs: profile.certs
      }
    };
    comments.push(comment);
  }

  const price = product.price;
  const loan = yield rpc.fin.xiaoying.loan.calculate({
    data: {
      principal: price
    },
    dataIn: 'response.body.data.loan'
  });

  this.body = {
    product: product,
    brand: brand,
    comments: comments,
    loan: {
      periods: loan.periods,
      price: loan.roundDownTotalPrice,
      firstPay: loan.roundDownMonthlyRepay,
      totalPrice: loan.totalPrice
    }
  };
};