class AddCurrentTileOwnerDataToGameTurn < ActiveRecord::Migration
  def self.up
    add_column :game_turns, :current_tile_owner_data, :text
  end

  def self.down
    remove_column :game_turns, :current_tile_owner_data
  end
end
