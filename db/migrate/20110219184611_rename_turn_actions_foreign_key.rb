class RenameTurnActionsForeignKey < ActiveRecord::Migration
  def self.up
    rename_column :turn_actions, :turn_id, :game_turn_id
  end

  def self.down
    rename_column :turn_actions, :game_turn_id, :turn_id
  end
end
