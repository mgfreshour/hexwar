class AddAvailableForRandomGamesToPlayers < ActiveRecord::Migration
  def self.up
    add_column :players, :available_for_random, :boolean
  end

  def self.down
    remove_column :players, :available_for_random
  end
end
