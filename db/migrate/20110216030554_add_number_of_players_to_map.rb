class AddNumberOfPlayersToMap < ActiveRecord::Migration
  def self.up
    add_column :maps, :number_of_players, :integer, :null=>false, :default => 2
  end

  def self.down
    remove_column :maps, :number_of_players
  end
end
