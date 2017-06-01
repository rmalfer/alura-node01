var express = require('express');
var app = express();

app.set('view engine','ejs');

app.get('/produtos',function(req,res){
	//res.send("<h1>Listagem de produtos</h1>");
	console.log("atentendo a requisicao...ok");
	res.render("produtos/lista");
});

app.listen(3000,function(){
	console.log("servidor rodando");
});