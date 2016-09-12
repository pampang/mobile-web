'use strict';

// 启动自己的服务器。
// 目录路径写死在metal中，指向的是/app/controller
require('@ninozhang/metal').startCluster({
  baseDir: __dirname,
  port: 8010
});
