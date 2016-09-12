'use strict';

exports.extract = function (data, keys) {
	let retData = {};
	keys.forEach( (key) => {
		if (key.key) {
			retData[key.key] = data[key.key] === undefined ? key.value : data[key.key];
		} else {
			retData[key] = data[key];
		}
	} );

	return JSON.parse(JSON.stringify(retData));
};
