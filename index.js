const fs = require('fs');
const iconv = require('iconv-lite');

fs.readFile('msinfo-reports/CPDJO-tcp.txt', function(err, content){
	var content = iconv.decode(content, 'win1252');

	var lines = content.split('\n');

	console.log(lines[5].split('\t')[2]);
});


