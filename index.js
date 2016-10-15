var items = require("./data/item.json");
var mats = require("./data/mats.json");

for (var key in items) {
	//slot
	var value = items[key];
	for (var key2 in value) {
		//x-pack
		var value2 = value[key2];
		var str = "";
		console.log( "\n",key2, "\n")
		for (var key3 in value2) {
			//item
			var item = value2[key3];
			var costToMake = item.reduce((prev, item) => {
				var itemName = item.name;
				var required = item.number;
				var itemCost = mats[itemName.toLowerCase()]
				var total = itemCost * required;

				prev += total;

				return prev;
			}, 0);
			str += key3 + " " + costToMake + "\n";
			//console.log(key3, costToMake)
		}
		console.log(str)
	}
}