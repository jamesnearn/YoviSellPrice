// This is Raise Only Market, sells are only allowed to be placed higher than the current lowest sell.
// - max wall size: 0.01000001 btc
// - max sell order size: 0.01000001 btc
// - minimal step between new orders: 0.00000100
// - max 2 open for sell allowed for ROM market



const request = require('request');

request('https://yobit.net/api/3/depth/yovi_btc?limit=2000', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  if (body.yovi_btc == null) {
    console.log("body.yovi_btc is null.  This is the result of body:");
    console.log(body);
  } else {
    console.log("Parsing body.yovi_btc...");
    body.yovi_btc.asks.forEach(ask => parseYoviBtcAsk(ask));
  }
});

function parseYoviBtcAsk(ask) {
	var yoviPrice = ask[0];
	var yoviAmount = ask[1];
	var btcWall = yoviPrice * yoviAmount;
	if (btcWall < 0.0099) {
		var btcWallLeft = 0.0099 - btcWall;
		var availableSellAmount = btcWallLeft / yoviPrice;
		
		if (btcWallLeft >= 0.0001) {
			console.log("BTC-YOVI Price: " + yoviPrice + "  YOVI wall amount: " + yoviAmount + "  BTC wall amount: " + btcWall);
			console.log("vacant BTC left in wall: " + btcWallLeft);
			console.log("YOVI amount to sell: " + availableSellAmount);
			console.log("");
		}
	}	
}
