#!/usr/bin/env -S node --max-old-space-size=8192 --unhandled-rejections=strict
// A JSON Document per line (VAC) Parsing Utility
// by Don Bales on 2020-12-05

const fs = require('fs');

async function piper() {
	return new Promise((resolve, reject) => {
		const timer = setTimeout(() => { resolve(data); }, 1000);

		const stdin = process.stdin;
		
		let data = '';

		stdin.setEncoding('utf8');

		stdin.on('data', (chunk) => {
			clearTimeout(timer);
			// console.log('stdin.on data');
			// console.log(chunk);
		 	data += chunk;
		});

		stdin.on('end', () => {
			clearTimeout(timer);
			// console.log('stdin.on end');
			resolve(data);
		});

		stdin.on('error', (err) => {
			clearTimeout(timer);
			// console.error(`stdin.on error: ${err.message}`);
			reject(err);
		});
	});
}

async function main() {
	const args = [];
	let switches = false;
	if (process.argv.length > 2) {
		for (let i = 2; i < process.argv.length; i++) {
			const arg = process.argv[i]; 
			if (arg === '-d' ||
				arg === '-p') {
				switches = true;
			}
			args.push(arg);
		}
	}
	// console.log(args);

	const docs = [];
	
	let data = await piper();	

	// console.log(`data.length: ${data.length}`);

	if (args.length > 0 &&
		data.length === 0) {
		let filename = args[args.length - 1];
		let stat = null;
		try {
			stat = fs.statSync(filename);
		} catch(err) {
			console.error(err.message);
			process.exit(1);
		}
		if (stat &&
			stat.size > 0) {
			data = fs.readFileSync(filename);
		} 
	} else
	if (args.length === 0 &&
		data.length === 0) {
		console.log(`usage: vac [-d " "] [-p properties,...] [filename]`);
		console.log(`-d, a delimiter, default: tab character`);
		console.log(`-p, a comma separated list of properties`);
		console.log(`filename, a Vendor Akeneo Collection (text file with a JSON doc per line)`);
		process.exit(0);
	}

	if (data) {
		const lines = data.toString().split('\n');
		for (const line of lines) {
			// console.log(line);
			try {
				if (line.trim()) {
					docs.push(JSON.parse(line.trim()));
				}
			} catch (err) {
				console.error(err.message);
				process.exit(2);
			}
		}
	}
	// console.log(docs);

	const documentProperties = new Set();
	for (const doc of docs) {
		for (const property in doc) {
			if (!(documentProperties.has(property))) {
				documentProperties.add(property);
			}
		}
	}

	if (!(switches)) {
		const sortable = [];
		for (const value of documentProperties.values()) {
			sortable.push(value);
		}
		console.log('Object Properties');
		console.log('-----------------');
		for (const value of sortable.sort()) {
			console.log(value);
		}
	} else {
		let commandProperties = '';
		let commandDelimiter = '\t';
		for (let i = 0; i < args.length; i++) {
			const arg = args[i];
			if (arg === '-d' &&
				i + 1 < args.length) {
				commandDelimiter = args[i + 1];
			} else
			if (arg === '-p' &&
				i + 1 < args.length) {
				commandProperties = args[i + 1];
			}
		}
		if (commandProperties) {
			const properties = commandProperties.split(',');
			// console.log(properties);
			if (properties) {
				for (const doc of docs) {
					let line = '';
					for (let i = 0; i < properties.length; i++) {
						const property = properties[i];
						const value = doc[property] !== undefined ? doc[property] : '';
						line += (i < properties.length - 1) ? `${value}${commandDelimiter}` : `${value}`;
					}
					console.log(line);
				}
			}
		}
	}

	process.exit(0);
} 

main();
