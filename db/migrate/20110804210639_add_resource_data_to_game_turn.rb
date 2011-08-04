class AddResourceDataToGameTurn < ActiveRecord::Migration
  def self.up
    add_column :game_turns, :resource_data, :text
  end

  def self.down
    remove_column :game_turns, :resource_data
  end
end
