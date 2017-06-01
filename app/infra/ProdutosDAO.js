//Igual a uma classe FuncaoNome
//prototype é uma propriedade
//_ como convenção
//nome DAO usado conforme Design Patterns

function ProdutosDAO(connection){
	this._connection = connection;
}

ProdutosDAO.prototype.lista = function(callback){
	this._connection.query('select * from produtos',callback);
}

ProdutosDAO.prototype.salva = function(produto, callback){
	this._connection.query('insert into produtos set ?',produto,callback);
}


module.exports = function(){
	return ProdutosDAO;
}