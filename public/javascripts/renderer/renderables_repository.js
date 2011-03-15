
function RenderablesRepository() {
	this.items = new Array();
}

RenderablesRepository.prototype.addItem = function(item) {
	this.items.push(item);
	return items.length;
}

RenderablesRepository.prototype.getItem = function(index) {
	if (index <= 0 || index > this.items.length) {
		throw 'RenderablesRepository::getItem() - invalid index ['+index+']';
	}
	return this.items[index-1];
}