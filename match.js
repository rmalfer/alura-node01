var urlDeConexao = "mysql://b4f54bc8673dbe:31034682@us-cdbr-iron-east-03.cleardb.net/heroku_20360160efa587e?reconnect=true";
var grupos = urlDeConexao.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?reconnect=true/);
console.log("grupos[0]" + grupos[0]);
console.log("grupos[3]" + grupos[3]);
console.log("grupos[1]" + grupos[1]);
console.log("grupos[2]" + grupos[2]);
console.log("grupos[4]" + grupos[4]);