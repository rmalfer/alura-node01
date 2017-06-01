//produtosController
//	lista json?
//	cadastro aceita json?

var http = require('http');
var assert = require('assert');

describe('produtosController',function(){
	it('#Listagem json',function(done){

		var configuracoes = {
			hostname:'localhost',
			port:3000,
			path:'/produtos',
			headers: {
				'Accept':'application/json'
			}
		};

		http.get(configuracoes,function(res){

			assert.equal(res.statusCode,200);
			assert.equal(res.headers['content-type'],'application/json; charset=utf-8');

			//ou

			if(res.statusCode == 200){
				console.log("Status ok");
			}
			if(res.headers['content-type'] == 'application/json; charset=utf-8'){
				console.log("Content type ok");
			}

			done(); //Truque, para dizer que tem uma funcao callback, senão o teste roda async e não retorna nada.
		});

		//console.log("Teste de verificação de list de json");
	});
});