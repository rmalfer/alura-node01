module.exports = function(app){
	
	var listaProdutos = function(req,res,next){
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);
		//new serve pra carregar do zero e não trazer valores anteriores
		produtosDAO.lista(function(erros,resultados){
			if(erros){
				return next(erros); //Funcao extra p/ guardar erros
			}
			res.format({
				html: function(){
					res.render("produtos/lista",{lista:resultados}); //passar o results pro lista(json) no ejs		
				},
				json: function(){
					res.json(resultados);
				}
			});			
		});
		
		connection.end();		
	};

	app.get('/produtos',listaProdutos);
	
	app.get('/produtos/json',function(req,res){
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);
		produtosDAO.lista(function(erros,resultados){
			res.json(resultados); 
		});
		
		connection.end();		
	});	
	
	app.get('/produtos/form',function(req,res){
		res.render('produtos/form',{errosValidacao:{},produto:{}}); //coloco errosV... p/ não dar erro
	});

	//app.post('/produtos/salva',function(req,res){
		//é possível chamar só /produtos e no form colocar só action='produtos',
		//pois o server reconhece que se for post, faz alguma coisa e get outra.
	app.post('/produtos/',function(req,res){
			
		var produto = req.body;
		//console.log(produto);

		req.assert('titulo','Título obrigatório').notEmpty();
		req.assert('preco','Formato inválido').isFloat();
		//var validadorTitulo = req.assert('titulo','Título obrigatório');
		//validadorTitulo.notEmpty();

		var erros = req.validationErrors();
		if (erros){
			res.format({
				html: function(){
					res.status(400).render('produtos/form',{errosValidacao:erros,produto:produto});
				},
				json: function(){
					res.status(400).json(erros);
				}
			});

			
			return;
		}

		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);
		
		produtosDAO.salva(produto,function(erros,resultados){
			//listaProdutos(req,res);
			console.log(erros);
			res.redirect('/produtos');
		});
	});

	app.get('produtos/remove',function(){
		var connection = app.infra.connectionFactory();
		var produtosBanco = app.infra.ProdutosDAO(connection);
		var produto = produtosBanco.carrega(id, callback);
		if (produto){
			produtosBanco.remove(produto,callback);
		}
	});

}

/*
module.exports = function(app){
	app.get('/produtos',function(req,res){
		//var connection = connectionFactory();
		var connection = app.infra.connectionFactory();

		connection.query('select * from livros', function(err,results){
			//res.send(results);
			res.render("produtos/lista",{lista:results}); //passar o results pro lista(json) no ejs
		});

		connection.end();		
	});
}
*/