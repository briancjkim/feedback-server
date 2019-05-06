// localtunner이 자꾸 지혼자 종료되서 해결책.
//  npm install --save-dev forever
// 이파일 만들고 package.json에서 "webhook":"forever sendgrid_webhook.js"로바꿈

var localtunnel = require("localtunnel");
localtunnel(5000, { subdomain: "rlackswhd91" }, function(err, tunnel) {
  console.log("LT running");
});
