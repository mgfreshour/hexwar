class AddTileAttributesToUnitType < ActiveRecord::Migration
  def self.up
    add_column :unit_types, :move_cost_grass, :integer, :default => 1, :null => false
    add_column :unit_types, :move_cost_dirt, :integer, :default => 1, :null => false
    add_column :unit_types, :move_cost_city, :integer, :default => 1, :null => false
    add_column :unit_types, :move_cost_castle, :integer, :default => 1, :null => false
    add_column :unit_types, :move_cost_water, :integer, :default => 1, :null => false
    add_column :unit_types, :move_cost_bridge_left, :integer, :default => 1, :null => false
    add_column :unit_types, :move_cost_bridge_right, :integer, :default => 1, :null => false
    add_column :unit_types, :move_cost_bridge_center, :integer, :default => 1, :null => false
    add_column :unit_types, :move_cost_path, :integer, :default => 1, :null => false
    add_column :unit_types, :move_cost_swamp, :integer, :default => 1, :null => false
    add_column :unit_types, :move_cost_desert, :integer, :default => 1, :null => false
    add_column :unit_types, :move_cost_oasis, :integer, :default => 1, :null => false
    add_column :unit_types, :move_cost_forest, :integer, :default => 1, :null => false
    add_column :unit_types, :move_cost_hills, :integer, :default => 1, :null => false
    add_column :unit_types, :move_cost_mountains, :integer, :default => 1, :null => false
    
    add_column :unit_types, :defense_bonus_grass, :integer, :default => 0, :null => false
    add_column :unit_types, :defense_bonus_dirt, :integer, :default => 0, :null => false
    add_column :unit_types, :defense_bonus_city, :integer, :default => 0, :null => false
    add_column :unit_types, :defense_bonus_castle, :integer, :default => 0, :null => false
    add_column :unit_types, :defense_bonus_water, :integer, :default => 0, :null => false
    add_column :unit_types, :defense_bonus_bridge_left, :integer, :default => 0, :null => false
    add_column :unit_types, :defense_bonus_bridge_right, :integer, :default => 0, :null => false
    add_column :unit_types, :defense_bonus_bridge_center, :integer, :default => 0, :null => false
    add_column :unit_types, :defense_bonus_path, :integer, :default => 0, :null => false
    add_column :unit_types, :defense_bonus_swamp, :integer, :default => 0, :null => false
    add_column :unit_types, :defense_bonus_desert, :integer, :default => 0, :null => false
    add_column :unit_types, :defense_bonus_oasis, :integer, :default => 0, :null => false
    add_column :unit_types, :defense_bonus_forest, :integer, :default => 0, :null => false
    add_column :unit_types, :defense_bonus_hills, :integer, :default => 0, :null => false
    add_column :unit_types, :defense_bonus_mountains, :integer, :default => 0, :null => false
  end

  def self.down
    remove_column :unit_types, :move_cost_grass
    remove_column :unit_types, :move_cost_dirt
    remove_column :unit_types, :move_cost_city
    remove_column :unit_types, :move_cost_castle
    remove_column :unit_types, :move_cost_water
    remove_column :unit_types, :move_cost_bridge_left
    remove_column :unit_types, :move_cost_bridge_right
    remove_column :unit_types, :move_cost_bridge_center
    remove_column :unit_types, :move_cost_path
    remove_column :unit_types, :move_cost_swamp
    remove_column :unit_types, :move_cost_desert
    remove_column :unit_types, :move_cost_oasis
    remove_column :unit_types, :move_cost_forest
    remove_column :unit_types, :move_cost_hills
    remove_column :unit_types, :move_cost_mountains
    
    remove_column :unit_types, :defense_bonus_grass
    remove_column :unit_types, :defense_bonus_dirt
    remove_column :unit_types, :defense_bonus_city
    remove_column :unit_types, :defense_bonus_castle
    remove_column :unit_types, :defense_bonus_water
    remove_column :unit_types, :defense_bonus_bridge_left
    remove_column :unit_types, :defense_bonus_bridge_right
    remove_column :unit_types, :defense_bonus_bridge_center
    remove_column :unit_types, :defense_bonus_path
    remove_column :unit_types, :defense_bonus_swamp
    remove_column :unit_types, :defense_bonus_desert
    remove_column :unit_types, :defense_bonus_oasis
    remove_column :unit_types, :defense_bonus_forest
    remove_column :unit_types, :defense_bonus_hills
    remove_column :unit_types, :defense_bonus_mountains
  end
end
