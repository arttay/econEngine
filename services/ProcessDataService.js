const fs = require("fs");
const goldItems = require("../data/items.json").jc;
const HttpService = require("./HttpService");
const apiKey = "beqsz8sfssjdeenwnxqaeyn78ftpan2a";
const itemApi = "https://us.api.battle.net/wow/item/";


const ProcessDataService = {
	init: function (data) {
		var parsedData = JSON.parse(data);

		var realms = parsedData.realms;
		var auctions = parsedData.auctions;

		var panthers = auctions.reduce(function (prev, item) {
			goldItems.forEach((value) => {
				if (item.item === value.item && prev.indexOf(item.item) === -1) {
					prev.push(item.item);
					this.calcMats(value);
				}
			});

			return prev;
		}.bind(this), []);

	//console.log(panthers)

	},
	calcMats: function (matsObject) {
		var promiseArray = [];


		for (var key in matsObject) {
			var item = matsObject[key];
			console.log(key)
			var foo = item.forEach((value) => {
				var url = "https://us.api.battle.net/wow/item/"+ value.id + "?apiKey=" + apiKey;
				HttpService.get(url).then((data) => {
					console.log(data)
				}, (err) => {
					console.log(err);
				})
			});
		}

		
		//console.log(itemNumber)
	}
}


module.exports = ProcessDataService;