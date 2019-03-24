
var http = require('http');
var fs = require('fs');
var path = require('path');

// copied from https://stackoverflow.com/a/53738780/4086967
// for the sake of getting this quickly working!
function getArgs() {
	const args = {}
	process.argv
		.slice(2, process.argv.length)
		.forEach(arg => {
			// long arg
			if (arg.slice(0, 2) === '--') {
				const longArg = arg.split('=')
				args[longArg[0].slice(2, longArg[0].length)] = longArg[1]
			}
			// flags
			else if (arg[0] === '-') {
				const flags = arg.slice(1, arg.legnth).split('')
				flags.forEach(flag => {
					args[flag] = true
				})
			}
		})
	return args;
}

const args = getArgs();
const port = args.port || 3000;

http.createServer(function (request, response) {
	console.log('request ', request.url);

	var filePath = '.' + request.url;
	if (filePath == './') {
		filePath = './index.html';
	}

	var extname = String(path.extname(filePath)).toLowerCase();
	var mimeTypes = {
		'.html': 'text/html',
		'.js': 'text/javascript',
		'.css': 'text/css',
		'.json': 'application/json',
		'.png': 'image/png',
		'.jpg': 'image/jpg',
		'.gif': 'image/gif',
		'.wav': 'audio/wav',
		'.mp4': 'video/mp4',
		'.woff': 'application/font-woff',
		'.ttf': 'application/font-ttf',
		'.eot': 'application/vnd.ms-fontobject',
		'.otf': 'application/font-otf',
		'.svg': 'application/image/svg+xml'
	};

	var contentType = mimeTypes[extname] || 'application/octet-stream';

	fs.readFile(filePath, function (error, content) {
		if (error) {
			if (error.code == 'ENOENT') {
				fs.readFile('./404.html', function (error, content) {
					response.writeHead(200, { 'Content-Type': contentType });
					response.end(content, 'utf-8');
				});
			}
			else {
				response.writeHead(500);
				response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
				response.end();
			}
		}
		else {
			response.writeHead(200, { 'Content-Type': contentType });
			response.end(content, 'utf-8');
		}
	});

}).listen(port);
console.log('Server running at http://127.0.0.1:' + port);
