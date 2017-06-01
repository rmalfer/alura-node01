var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function(){

	var app = express();
	app.use(express.static('./app/public'));
	app.set('view engine','ejs');
	app.set('views','./app/views');

	//req -> middlewareBodyParser -> middlewareAutenticacao -> função q trata a requisição
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(expressValidator());

	load('routes', {cwd: 'app'})
		.then('infra')
		.into(app);

	app.use(function(req,res,next){
		res.status(404).render('erros/404'); //Middleware próprio
		next();
	});

	app.use(function(error,req,res,next){
		//console.log("###" + process.env.NODE_ENV);
		if(process.env.NODE_ENV == 'production'){
			//res.status(500).render('erros/500'); //Middleware próprio
			//return;
		}
		next(error);
	});

	return app;
}
/*
ou 

module.exports = function(){
	var app = require('express')();
	app.set('view engine','ejs');
	return app;
}

}
*/