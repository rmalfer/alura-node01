var mysql = require('mysql');

//FACTORY METHOD
function createDBConnection(){
	
	//process.env.NODE_ENV = 'test'

	if (!process.env.NODE_ENV){
		return mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : '',
			database : 'casadocodigo'
		});
	}

	if (process.env.NODE_ENV == 'production'){
		var urlDeConexao = process.env.CLEARDB_DATABASE_URL;
		//mysql://b4f54bc8673dbe:31034682@us-cdbr-iron-east-03.cleardb.net/heroku_20360160efa587e?reconnect=true
		var grupos = urlDeConexao.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?reconnect=true/);

		return mysql.createConnection({
			//host : 'us-cdbr-iron-east-03.cleardb.net',
			//user : 'b4f54bc8673dbe',
			//password : '31034682',
			//database : 'heroku_20360160efa587e'
			host : grupos[3],
			user : grupos[1],
			password : grupos[2],
			database : grupos[4]
		});
	}

	if (process.env.NODE_ENV == 'test'){
		return mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : '',
			database : 'casadocodigo_teste'
		});
	}
}

//wrapper - função que embrulha outra função
module.exports = function(){
	return createDBConnection;
}