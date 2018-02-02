// This is Raise Only Market, sells are only allowed to be placed higher than the current lowest sell.
// - max wall size: 0.01000001 btc
// - max sell order size: 0.01000001 btc
// - minimal step between new orders: 0.00000100
// - max 2 open for sell allowed for ROM market



const request = require('request');

request('https://yobit.net/api/3/depth/yovi_btc?limit=2000', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  body.yovi_btc.asks.forEach(ask => {
  	var btc = ask[0] * ask[1];
  	if (btc < 0.009) {
  		console.log("Price:" + ask[0] + "  YOVI:" + ask[1] + "  BTC:" + btc);

  		var btcWallLeft = 0.009 - btc;
  		console.log("BTC left: " + btcWallLeft);

  		console.log("YOVI amount: " + btcWallLeft / ask[0]);
  	}
  });
});
