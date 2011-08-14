# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20110813233724) do

  create_table "game_players", :force => true do |t|
    t.integer  "game_id"
    t.integer  "player_id"
    t.string   "team"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "game_players", ["game_id"], :name => "game_id_idx"
  add_index "game_players", ["player_id"], :name => "player_id_idx"

  create_table "game_turns", :force => true do |t|
    t.integer  "round_number"
    t.integer  "game_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "start_unit_data"
    t.text     "current_unit_data"
    t.text     "end_unit_data"
    t.string   "player"
    t.text     "current_tile_owner_data"
    t.text     "resource_data"
  end

  add_index "game_turns", ["game_id", "created_at"], :name => "game_order_id_idx"

  create_table "games", :force => true do |t|
    t.integer  "map_id"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "game_winner"
  end

  create_table "maps", :force => true do |t|
    t.string   "name"
    t.text     "tile_data"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "height"
    t.integer  "width"
    t.text     "unit_data"
    t.integer  "number_of_players", :default => 2, :null => false
  end

  create_table "message_viewers", :force => true do |t|
    t.integer  "player_id"
    t.integer  "message_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "message_viewers", ["player_id"], :name => "index_message_viewers_on_player_id"

  create_table "messages", :force => true do |t|
    t.text     "text",       :default => "Message Text", :null => false
    t.string   "title"
    t.integer  "player_id",                              :null => false
    t.integer  "game_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "messages", ["game_id", "created_at"], :name => "index_messages_on_game_id_and_created_at"

  create_table "players", :force => true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "uid"
    t.string   "provider"
    t.boolean  "admin"
    t.string   "email"
    t.boolean  "notify_by_email"
    t.string   "real_name"
  end

  add_index "players", ["provider", "uid"], :name => "provider_uid_idx"

  create_table "terrain_modifiers", :force => true do |t|
    t.integer  "unit_type_id"
    t.integer  "tile_type_id"
    t.integer  "defense_bonus"
    t.integer  "movement_cost"
    t.string   "tile_type_name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "terrain_modifiers", ["unit_type_id"], :name => "unit_type_idx"

  create_table "tile_types", :force => true do |t|
    t.string   "name"
    t.string   "img"
    t.integer  "position"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "img_x",                :default => 0,     :null => false
    t.integer  "img_y",                :default => 0,     :null => false
    t.boolean  "ownable"
    t.boolean  "is_store",             :default => false, :null => false
    t.string   "unit_types_available"
  end

  create_table "turn_actions", :force => true do |t|
    t.integer  "game_turn_id"
    t.string   "action"
    t.integer  "unit_x"
    t.integer  "unit_y"
    t.integer  "target_x"
    t.integer  "target_y"
    t.string   "value"
    t.string   "param2"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "turn_notifications", :force => true do |t|
    t.integer  "player_id"
    t.integer  "game_id"
    t.string   "game_name"
    t.string   "player_email"
    t.boolean  "notify_by_email"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "turn_notifications", ["player_id"], :name => "index_turn_notifications_on_player_id"
  add_index "turn_notifications", ["updated_at", "notify_by_email"], :name => "index_turn_notifications_on_updated_at_and_notify_by_email"

  create_table "unit_types", :force => true do |t|
    t.string   "name"
    t.string   "img"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "position"
    t.integer  "attack_range",  :default => 1,   :null => false
    t.integer  "move_range",    :default => 2,   :null => false
    t.integer  "img_x",         :default => 0,   :null => false
    t.integer  "img_y",         :default => 0,   :null => false
    t.integer  "attack_power"
    t.integer  "defense_power"
    t.integer  "price",         :default => 100, :null => false
  end

end
