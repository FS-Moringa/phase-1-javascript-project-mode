// let requestOptions = {
//     method: 'GET',
//     redirect: 'follow'
// };

// dd086e9d-4f05-4e3f-b762-dc7d5a0a0fa3
//api get request for crypto asset data to populate currency market section

fetch('https://api.coincap.io/v2/assets/?_limit=20')
    .then(function (response) {
        console.log(response)
        return response.json()
    })
    //the data will then be input into the function populateCryptoTable
    .then(function (data) {
        console.log(data)
        populateCryptoTable(data)
    })

    //catch method to log errors
    .catch(error => console.log(error))


//function that populates the currency market section with data from the api
function populateCryptoTable(data) {
    let market = [];
    let coinName = [];
    let lastPrice = [];
    let TwentyFourHourChange = [];
    let chart = [];
    let marketCap = [];

    data['data'].forEach((coin) => {
        market.push(coin.symbol);
        coinName.push(coin.name);
        lastPrice.push(coin.priceUsd);
        TwentyFourHourChange.push(coin.changePercent24Hr);
        chart.push(coin.vwap24Hr);
        marketCap.push(coin.marketCapUsd);
    })

    let cryptoTable = document.querySelector('#crypto-table-body')
    let add = "";

    for (let i = 0; i < coinName.length; i++) {
        add += "<tr>"
        add += "<td>" + market[i] + "</td>"
        add += "<td>" + coinName[i] + "</td>"
        add += "<td>$" + lastPrice[i] + "</td>"
        add += "<td>" + TwentyFourHourChange[i] + "</td>"
        add += "<td>" + chart[i] + "</td>"
        add += "<td>$" + marketCap[i] + "</td>"

        // turn the 24hr price change price change either green or red
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



//News API GET Request

fetch('https://newsdata.io/api/1/news?apikey=pub_85111e53b643cfda4841a1cccecbb8fa3f37&q=crypto&language=en&category=business')
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data)
        displayNews(data)
    })
    .catch(err => console.log(err))

function displayNews(data) {
    for (let i = 0; i < data.length; i++) {
        let newsSlide = document.getElementById('news-slider')
        newsSlide.innerHTML +=
            `<div class='slides'> <h3>${data[i].title}</h3> <br>
            By:${data[i].creator} ${data[i].pubDate} <br>
            ${data[i].description} 
            ${data[i].link} </div> <br>`
    }
}