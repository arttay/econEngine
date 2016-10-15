var request = require('request');
var fs = require("fs");
var processData = require("./services/ProcessDataService.js");
const apiKey = "beqsz8sfssjdeenwnxqaeyn78ftpan2a";
var url = "https://us.api.battle.net/wow/auction/data/proudmoore?locale=en_US&apikey=" + apiKey;



request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
  	var parsed = JSON.parse(body);
  	var dumpUrl = parsed.files[0].url;
  	var lastModified = parsed.files[0].lastModified;

/*
  	lastMod(lastModified).then(function (data) {
  		console.log(data);
  		processData.init(data);
  	}, function (err) {
  		getAhDump(dumpUrl);
  	});
  	*/

  //	getAhDump(dumpUrl);

  tempGetDump()
  }
});

function tempGetDump () {
	fs.readFile("./ahData.json", {encoding: 'utf-8'}, function(err,data){
		processData.init(data);
	});
}

function getAhDump (url) {
	request(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	var data = JSON.parse(body);

	  	
	  	fs.writeFile("ahData.json", body, function(err) {
		    if(err) return console.log(err);
		    
		    console.log("The file was saved!");

		}); 
		
	  } else {
	  	console.log(error)
	  }
	});
}

function lastMod (lastModified) {
	return new Promise(function (resolve, reject) {
		fs.readFile("./lastMod", {encoding: 'utf-8'}, function(err,data){
		    if (!err){
		    	if (data === "") {
		    		var json = { "lastModified": lastModified };

		    		fs.writeFile("./lastMod", JSON.stringify(json), function(err) {
					    if(err) return console.log(err);
					    
					    console.log("The file was saved!");
					}); 
					reject(false);
		    	} else {
		    		var lastMod = JSON.parse(data).lastModified;
		    		if (lastMod === lastModified) {
		    			resolve(true);
		    		}  else {
		    			reject(false);
		    		}
		    	}
		    	
		    }else{
		        console.log(err);
		    }

		});
	});



}