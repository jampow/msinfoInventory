const fs = require('fs');
const iconv = require('iconv-lite');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./localStorage');
const regx = {
	header: /^\u0000\[[^\]]+\]/,
	emptyLine: /^\u0000\u00013\u0000/
};

const regxdt = {
	osName: /nome do sistema operacional\t(.+)\t/i,
	cpu: /processador\t(.+)\t/i,
	[Symbol.iterator]: function *() {
		var own = Object.getOwnPropertyNames(this),
		prop;

		while(prop = own.pop()) {
			yield prop;
		}
	}
};

var computers = [];

fs.readFile('msinfo-reports/CPDJO-tcp.txt', function(err, content){
	var content = iconv
		.decode(content, 'win1252')
		.replace(/\0/g, '');

	var lines = content
		.split('\n');

	var rules = [...regxdt];

	var rule = rules.pop();

	var computer = {};

	lines.forEach(function(line){
		
		var emptyLine = line
			.match(regx.emptyLine);

		if(emptyLine) return;

		var mtch = line
			.match(regxdt[rule]);

		if(mtch){
			//console.log(mtch);

			computer[rule] = mtch[1];

			if(rules.length > 0)
				rule = rules.pop();
		}

	});

	computers.push(computer);

	localStorage.setItem('computers', JSON.stringify(computers));
});

