namespace('Hexwar.UI');

Hexwar.UI.notify = function(message, title, hide) {
	hide = hide == undefined ? true : hide;
	title = title || 'Notice';
	
	$.pnotify({   pnotify_title: title
				, pnotify_text: message
				, pnotify_hide: hide
				, pnotify_shadow: true });
}