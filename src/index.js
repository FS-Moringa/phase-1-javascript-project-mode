//api get request for crypto asset data to populate currency market section
fetch('api.coincap.io/v2/assets')
.then(Response => Response.json())
//the data will then be input into the function populateCryptoTable
.then(data => populateCryptoTable(data))
