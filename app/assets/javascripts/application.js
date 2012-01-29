// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require ./library/rails.js

// # External Libraries
//= require ./library/ba-debug.js
//= require ./library/jquery.pnotify.min.js

// # Actual Hexwar stuff
//= require ./utils/namespace.js
//= require ./utils/util.js
//= require ./utils/ui.js
//= require ./utils/notification_poller.js
//= require ./utils/hex.js
//= require ./utils/observable.js
//= require ./utils/array_2d.js
//= require ./renderer/renderable_item.js
//= require ./renderer/renderables_repository.js
//= require ./renderer/irenderer.js
//= require ./renderer/jquery_renderer.js
//= require ./views/map_view.js
//= require ./views/map_view_mask.js
//= require ./models/map.js
//= require ./models/tile.js
//= require ./models/tile_type.js
//= require ./models/tile_factory.js
//= require ./models/unit.js
//= require ./models/unit_type.js
//= require ./models/unit_factory.js
//= require ./utils/service_container.js

// # Game Controllers
//= require ./controllers/unit_controller.js
//= require ./controllers/game_controller.js
//= require ./controllers/unit_store_controller.js
//= require ./views/unit_store_dialog.js
//= require ./views/unit_stats_dialog.js
//= require ./views/unit_stats_table.js

// # Map Editor stuff
//= require ./map_editor/toolbox.js
//= require ./map_editor/new_dialog.js
//= require ./map_editor/map_editor.js
