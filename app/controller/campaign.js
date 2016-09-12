'use strict';

const rpc = require('@ninozhang/rpc');

/* EXPORT */

exports.get = function* () {
  const campaignId = this.params.campaignId;
  const userId = this.query.userId;

  const data = yield rpc.mall.campaign.client.get({
    data: {
      campaignId,
      userId
    },
    dataIn: 'response.body.data'
  });

  this.body = {
    data
  };
};
