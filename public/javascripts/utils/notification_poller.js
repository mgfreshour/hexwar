namespace('Hexwar.NotificationPoller');

/**
 * ...
 * @constructor
 * @param {Number} player_id
 */
Hexwar.NotificationPoller = function(player_id) {
	this.player_id = player_id;
	this.interval_seconds = 60;
	
	setInterval(this.poll.createDelegate(this), this.interval_seconds*1000);
}

Hexwar.NotificationPoller.prototype.poll = function(url) {
	url = url || '/games/is_it_my_turn';
	var successFunction = function(data, textStatus, jqXHR) {
		if (data.length) {
			$.each(data, function(idx, note){
				var title = 'Your Turn on '+note.turn_notification.game_name,
						  msg = '<a href="/games/'+note.turn_notification.game_id+'">Click Here to Play</a>';
				Hexwar.UI.notify(msg,title, false);
			});
		}
	}

	$.ajax({ 
		  type:'GET'
		, url:url
		, dataType: 'json'
		, success: successFunction.createDelegate(this)
		, error: function() {
			//modalAlert("While checking if it was your turn!", "Loading Failed");
		}
	});
}