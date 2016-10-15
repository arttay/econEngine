const request = require('request');



const HttpService = {
	get: function () {
		return new Promise((reject, resolve) => {
			request(url, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
			  	resolve(body);
			  } else {
			  	reject(error);
			  }
			});
		})
	}
}


module.exports = HttpService;
