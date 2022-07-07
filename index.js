const http = require('http');
const fs = require('fs');
const mm = require('./MIME_TYPES.js');
const sm =  require('./settings.js');
const s = sm.env(); 
const mt = mm.MIME_TYPES; 
const server = http.createServer((req, res) => {
	let url = req.url; 
	var r = res; 
	if(url == "/favicon.ico" && s.isDevEnv){ 
		// this removes the 404 error when asking for a favicon
		console.warn(`
		ignoring favicon if this isn't a development
		enviroment then there was an error 
		in the configruation
		[see settings.js]`);
		res.statusCode = 200;
		res.end();
	}
	else{
		if(url[url.length-1] == '/'){ 
			url += "index.html"; 
		}
		file = url.split('/')[url.split('/').length-1];
		if(!file.includes(".")){ 
			url += "/index.html"; 
		}
		url = s.baseDir + url; 
				
		console.log(url);
		fs.readFile(url, (err, data) => {
			if(err){ 
				let ert = mt[s["404_type"]]; 
				let erm = s["404_page"](url);
				res.writeHead(404,{"Content-Type":ert});
				
				res.write(erm);
				res.end();
				return; 
			}
			let file = url.split('/')[url.split('/').length-1]; 
			let mimetype = file.split('.');
			mimetype = mt[mimetype[mimetype.length-1]];
			console.log(mimetype);
			res.writeHead(200,{"Content-Type":mimetype});
			res.write(data); 
			console.log(data);
			res.end();
		});	 
	}
});
server.listen(s.port, s.hostname, () => {
	console.log(`listening on host ${s.hostname}:${s.port}`);
}) 