let requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

//api get request for crypto asset data to populate currency market section
fetch("http://api.coincap.io/v2/assets",requestOptions)
    .then(response => response.json())
    //the data will then be input into the function populateCryptoTable
    .then(data => populateCryptoTable(data))

    //catch method to log errors
    .catch(error => console.log(error))


//function that populates the currency market section with data from the api
function populateCryptoTable(data) {
    let market = []
    let coin = []
    let lastPrice = []
    let TwentyFourHourChange = []
    let chart = []
    let marketCap = []

    data['data'].forEach((coin) =>
        market.push(coin.symbol),
        coin.push(coin.name),
        lastPrice.push(coin.priceUsd),
        TwentyFourHourChange.push(coin.changePercent24Hr),
        chart.push(coin.vwap24Hr),
        marketCap.push(coin.marketCapUsd),
    )

    let cryptoTable = document.querySelector('#crypto-table')
    let add = ' '

    for (let i = 0; i < coin.length; i++) {
        add +=
            "<tr>" + market[i] + "</tr>"
        "<tr>" + coin[i] + "</tr>"
        "<tr>" + lastPrice[i] + "</tr>"
        "<tr>" + TwentyFourHourChange[i] + "</tr>"
        "<tr>" + chart[i] + "</tr>"
        "<tr>" + marketCap[i] + "</tr>"

        //turn the 24hr price change price change either green or red
        if (TwentyFourHourChange[i] > 0) {
            add +=
                "<td class = green-text>" + TwentyFourHourChange[i] + "</td>"
        } else {
            add +=
                "<td class = red-text>" + TwentyFourHourChange[i] + "</td>"
        }
        add += "</tr>"
    }
    cryptoTable.innerHTML = add

}

