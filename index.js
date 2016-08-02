const fs = require('fs');
const iconv = require('iconv-lite');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./localStorage');
const regx = {
	header: /^\u0000\[[^\]]+\]/,
	emptyLine: /^\u0000\u00013\u0000/
};

const regxdt = {
	osName: /nome do sistema operacional\t([^\t]+)/i,
	cpu: /processador\t(.+)\t/i,
	[Symbol.iterator]: function *() {
		var own = Object.getOwnPropertyNames(this),
		prop;

		while(prop = own.pop()) {
			yield prop;
		}
	}
};

fs.readFile('msinfo-reports/CPDJO-tcp.txt', function(err, content){
	var content = iconv.decode(content, 'win1252')
		.replace(/\0/g, '');

	var lines = content.split('\n');

	var rules = [...regxdt];
	console.log(rules);
	var rule = rules.pop();

	lines.forEach(function(line){
		
		var emptyLine = line.match(regx.emptyLine);

		if(emptyLine) return;

		var mtch = line.match(regxdt[rule]);

		if(mtch){
			console.log(mtch);

			if(rules.length > 0)
				rule = rules.pop();
		}

	});

});


