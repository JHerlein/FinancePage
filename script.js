let number = document.getElementById("input-1");
let count = 0
let wsBtc = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');

function getETHPrice() {
    let ws = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@ticker');
    ws.onmessage = (event) => {
        let cryptoObject = JSON.parse(event.data);
        let price = cryptoObject.c;
        number.value = "ETH USD " + price //+ Math.trunc(price);
        console.log("ETH " + price);
        ws.close();
        console.log("Connection close");     
    };
}

wsBtc.onmessage = (event) => {
    let cryptoObject = JSON.parse(event.data);
    let price = cryptoObject.c
    //number.value = price
    console.log("BTC " + price)
    
};

