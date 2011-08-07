namespace('Hexwar.UnitStoreController');
/**
 * ...
 * @constructor
 * @param {Game} game
 * @param {Map} map
 * @param {Hexwar.MapView} mapview
 * @param {String} current_player
 */
Hexwar.UnitStoreController = function (game, map, mapview, current_player) {
	this.map = map;
	this.game = game;
	this.mapview = mapview;
	this.current_player = current_player;
	this.unit_store_dialog = new Hexwar.UnitStoreDialog(this, this.game.unit_factory.unit_types);
}

/**
 * ...
 * @param {Integer} x
 * @param {Integer} y
 * @return {Boolean}
 */
Hexwar.UnitStoreController.prototype.attemptStoreSelect = function(x,y) {
	var tile = this.map.getTile(x,y);
	var unit = this.map.getUnit(x,y);
	if (tile.type.is_store && !unit && tile.owner == this.current_player) {
		var mask = new Hexwar.MapViewMask(this.map);
		mask.set(x,y, mask.mask_clear);
		this.mapview.drawMask(mask);
		
		this.unit_store_dialog.show(x,y, tile.type.unit_types_available);
		
		this.mapview.setDelegateClick(function() {
			this.unit_store_dialog.close();
			this.game.returnToNormalMode();
		}.createDelegate(this));
	}
}

/**
 * ...
 * @param {Integer} type_id
 */
Hexwar.UnitStoreController.prototype.buyUnit = function(x,y, type_id) {
	var price = this.game.unit_factory.unit_types[type_id].price;
	var gold = this.game.getGold();
	if (gold >= price) {
		var new_unit = this.game.unit_factory.createUnit(type_id, this.current_player, x, y);
		this.game.setGold(gold-price);
		new_unit.acted = true;
		this.map.setUnit(x, y, new_unit);
		this.mapview.drawUnit(x, y, new_unit);
		this.game.saveAction(x,y,'buy_unit',0,0,type_id);
	} else {
		modalAlert('You have '+gold+' gold and that unit costs '+price+'.  That really doesn`t work :^)');
	}
	this.game.returnToNormalMode();
}

/**
 * ...
 */
Hexwar.UnitStoreController.prototype.onDialogClose = function() {
	this.game.returnToNormalMode();
}