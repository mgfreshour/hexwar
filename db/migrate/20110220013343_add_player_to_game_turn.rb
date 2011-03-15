class AddPlayerToGameTurn < ActiveRecord::Migration
  def self.up
    add_column :game_turns, :player, :string
  end

  def self.down
    remove_column :game_turns, :player
  end
end
