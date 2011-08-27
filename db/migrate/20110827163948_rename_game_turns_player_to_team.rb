class RenameGameTurnsPlayerToTeam < ActiveRecord::Migration
  def self.up
    rename_column :game_turns, :player, :team
  end

  def self.down
    rename_column :game_turns, :team, :player
  end
end
