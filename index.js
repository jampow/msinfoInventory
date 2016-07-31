const fs = require('fs');
const iconv = require('iconv-lite');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./localStorage');
const regx = {
	header: /^\u0000\[[^\]]+\]/,
	emptyLine: /^\u0000\u00013\u0000/
};

fs.readFile('msinfo-reports/CPDJO-tcp.txt', function(err, content){
	var content = iconv.decode(content, 'win1252');

	var lines = content.split('\n');

	lines.forEach(function(line){
		
		var emptyLine = line.match(regx.emptyLine);

		if(emptyLine)
			console.log('empty');
			//return;

		var header = line.match(regx.header);

		if(header)
			console.log(line);
		else
			if(line.length == 3 && line.split(/\t/).length == 1)
				console.log(line.charCodeAt(0),line.charCodeAt(1),line.charCodeAt(2));
				//console.log(line);

	});

});


