class AddGameWinnerToGame < ActiveRecord::Migration
  def self.up
    add_column :games, :game_winner, :string
  end

  def self.down
    remove_column :games, :game_winner
  end
end
