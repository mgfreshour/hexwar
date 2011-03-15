class AddUnitStateToGameTurn < ActiveRecord::Migration
  def self.up
    add_column :game_turns, :start_unit_data, :text
    add_column :game_turns, :current_unit_data, :text
    add_column :game_turns, :end_unit_data, :text
    end

  def self.down
    remove_column :game_turns, :start_unit_data
    remove_column :game_turns, :current_unit_data
    remove_column :game_turns, :end_unit_data
  end
end
