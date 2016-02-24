//using
var http = require('http'),
	url = require('url'),
	path = require('path'),
	fileSystem = require('fs');
//server
function DebugInfo(response,loadTime,loadTime_){
	response.write("\nPage Create: "+ loadTime +"\n");
	response.write("Page Expiry: "+ loadTime_ +"\n");
	response.write("Page Load Time: "+ (loadTime_-loadTime)/10000  +"ms");
}
http.createServer(function (request, response) {
	console.log(request.url);
	var mimeType = "text/html";
	var startComment = "<!--";
	var endComment = "-->";
	var loadTime = Date.now();
	http.get( {host: 'localhost', port: 1234, path: url.parse(request.url).path}, function(res) {
		res.on("data", function(chunk) {
			var loadTime_ = Date.now();
			switch(path.extname(url.parse(request.url).pathname)) {
				case '.css':
					mimeType="text/css";
					startComment= "/*";
					endComment= "*/";
					break;
				case '.otf':
				case '.ico':
					break;
				case '.js':
					mimeType="text/javascript";
					startComment= "/*";
					endComment= "*/";
					break;
				case '.html':
					break;
			}
			response.writeHead(201, {'charset':'utf-8','Content-Type':mimeType});
			response.write(startComment+"\n");
			response.write("Page Create: "+ loadTime +"\n");
			response.write("Page Expiry: "+ loadTime_ +"\n");
			response.write("Page Load Time: "+ (loadTime_-loadTime)/10000  +"ms");
			response.write("\n"+endComment+"\n");
			response.end(chunk);
		});
	}).on('error', function(e) {
		
	});
}).listen(8888);