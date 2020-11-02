var axios = require("axios");

var config = {
  method: "post",
  url:
    `https://api.trello.com/1/cards?name=` +
    "Arreglar la canilla de la cocina" +
    `&desc=` +
    "Pierde la canilla de agua caliente" +
    `&idList=` +
    "5f9d787ff046818e66fe1434" +
    `&key=` +
    "8ab9f45299b63fa15ddec327e9aec24c" +
    `&token=` +
    "ef5e57d38c4b815c4ce2e22495aa9f66494f46514815c912b7d7700141e8890a" +
    `&idLabels=` +
    "5f9d96981375a91777c7a805",
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
