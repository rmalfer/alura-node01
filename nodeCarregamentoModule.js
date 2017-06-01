//### PARA ENTENDER COMO FUNCIONA OS MODULOS ###

//nome path é o mesmo nome que vai ser procurado dentro da pasta node_modules
//se tiver ./xxx ele vai procurar no caminho citado e não em node_modules.
function require(path) {
	var codigoDoSeuModulo = carregado(path);
	var funcaoDeCarregamento = function(){
		eval(codigoDoSeuModulo);
	}
	var module = {
		exports : {};
	};
	funcaoDeCarregamento(module,module.exports);
	return module;
}