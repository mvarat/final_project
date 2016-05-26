console.log("loaded");


var request = require('superagent');

var clientID = '7097e81011885f4fcfa7',
    clientSecret = '746298b09f290f3405c3fb0d0faac4f2',
    apiUrl = 'https://api.artsy.net/api/tokens/xapp_token'
    xappToken;

request
  .post(apiUrl)
  .send({ client_id: clientID, client_secret: clientSecret })
  .end(function(res) {
    xappToken = res.body.token;
  });
