let ethElement = document.getElementById("eth-price-1");
let btcElement = document.getElementById("btc-price-1");
let arrowElement_1 = document.getElementById("arrow-up-down-1");
let arrowElement_2 = document.getElementById("arrow-up-down-2");

let count = 0;
let wsBtc = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');
let lastEthPrice = 2748;
let lastBtcPrice = 30000;


function comparePrice(price, lastPrice, htmlElement){
    if (price < lastPrice){
        console.log("Bajo")
        htmlElement.style.backgroundColor = '#cf5353';
    }
    else{
        console.log("Subio")
        htmlElement.style.backgroundColor = '#53cf57'
    };
     
}

function getETHPrice() {
    let ws = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@ticker');
    ws.onopen = function(){
        console.log("Se conectó");
    };
    ws.onmessage = (event) => {
        let cryptoObject = JSON.parse(event.data);
        let price = cryptoObject.c;
        ethElement.innerText = "ETH Price USD " + parseFloat(price).toFixed(2);
        console.log("ETH " + price);
        ws.close();
        console.log("Connection close");
        comparePrice(price, lastEthPrice,arrowElement_1)
        lastEthPrice = price;
            
    };
}

wsBtc.onmessage = (event) => {
    let cryptoObject = JSON.parse(event.data);
    let price = cryptoObject.c;
    btcElement.innerText = "BTC Price USD " + parseFloat(price).toFixed(2);
    console.log("BTC " + parseFloat(price));
    comparePrice(price,lastBtcPrice,arrowElement_2)
    lastBtcPrice = price
    
};

var intervalId = setInterval(getETHPrice, 2000);