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

ActiveRecord::Schema.define(:version => 20110804165819) do

  create_table "game_players", :force => true do |t|
    t.integer  "game_id"
    t.integer  "player_id"
    t.string   "team"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

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
  end

  create_table "games", :force => true do |t|
    t.integer  "map_id"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
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

  create_table "players", :force => true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "uid"
    t.string   "provider"
    t.boolean  "admin"
  end

  create_table "tile_types", :force => true do |t|
    t.string   "name"
    t.string   "img"
    t.integer  "position"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "img_x",      :default => 0, :null => false
    t.integer  "img_y",      :default => 0, :null => false
    t.boolean  "ownable"
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

  create_table "unit_types", :force => true do |t|
    t.string   "name"
    t.string   "img"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "position"
    t.integer  "attack_range",                :default => 1, :null => false
    t.integer  "move_cost_grass",             :default => 1, :null => false
    t.integer  "move_cost_dirt",              :default => 1, :null => false
    t.integer  "move_cost_city",              :default => 1, :null => false
    t.integer  "move_cost_castle",            :default => 1, :null => false
    t.integer  "move_cost_water",             :default => 1, :null => false
    t.integer  "move_cost_bridge_left",       :default => 1, :null => false
    t.integer  "move_cost_bridge_right",      :default => 1, :null => false
    t.integer  "move_cost_bridge_center",     :default => 1, :null => false
    t.integer  "move_cost_path",              :default => 1, :null => false
    t.integer  "move_cost_swamp",             :default => 1, :null => false
    t.integer  "move_cost_desert",            :default => 1, :null => false
    t.integer  "move_cost_oasis",             :default => 1, :null => false
    t.integer  "move_cost_forest",            :default => 1, :null => false
    t.integer  "move_cost_hills",             :default => 1, :null => false
    t.integer  "move_cost_mountains",         :default => 1, :null => false
    t.integer  "defense_bonus_grass",         :default => 0, :null => false
    t.integer  "defense_bonus_dirt",          :default => 0, :null => false
    t.integer  "defense_bonus_city",          :default => 0, :null => false
    t.integer  "defense_bonus_castle",        :default => 0, :null => false
    t.integer  "defense_bonus_water",         :default => 0, :null => false
    t.integer  "defense_bonus_bridge_left",   :default => 0, :null => false
    t.integer  "defense_bonus_bridge_right",  :default => 0, :null => false
    t.integer  "defense_bonus_bridge_center", :default => 0, :null => false
    t.integer  "defense_bonus_path",          :default => 0, :null => false
    t.integer  "defense_bonus_swamp",         :default => 0, :null => false
    t.integer  "defense_bonus_desert",        :default => 0, :null => false
    t.integer  "defense_bonus_oasis",         :default => 0, :null => false
    t.integer  "defense_bonus_forest",        :default => 0, :null => false
    t.integer  "defense_bonus_hills",         :default => 0, :null => false
    t.integer  "defense_bonus_mountains",     :default => 0, :null => false
    t.integer  "move_range",                  :default => 2, :null => false
    t.integer  "img_x",                       :default => 0, :null => false
    t.integer  "img_y",                       :default => 0, :null => false
    t.integer  "attack_power"
    t.integer  "defense_power"
  end

end
