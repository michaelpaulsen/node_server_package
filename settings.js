exports.env = function(){ 
	return {
		isDevEnv : true,
		hostname : '127.0.0.1',
		port : 3000,
		baseDir : "./docroot",
		"404_type" : "html", 
		"404_page" :function(url) {return `<html>
			<head>
				<title> page not found </title> 
			</head> 
			<body>
				<h1>404 - unable to find your page </h1> 
				<hr />
				<p> for some reason the server was unable to find ${url} the page you requested
					make shure that you typed the URL corectly!</p>
			</body>
		</html>`
		}
	}
}