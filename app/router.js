'use strict';

module.exports = function router(app) {
  // VERSION 1
  app.get('/', app.controller.index.ecshop);
  app.get('/mobile', app.controller.index.ecshop);
  app.get('/mobile/', app.controller.index.ecshop);

  app.get('/product/:productId', app.controller.index.index);
  app.get('/topic/:topicId', app.controller.index.index);

  app.get('/1/page/product/:productId', app.controller.pageProduct.get);
  app.get('/1/page/topic/:topicId', app.controller.pageTopic.get);

  // 活动
  app.get('/1/client/campaign/:campaignId', app.controller.campaign.get);
};
