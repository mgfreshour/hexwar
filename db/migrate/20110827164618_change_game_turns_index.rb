class ChangeGameTurnsIndex < ActiveRecord::Migration
  def self.up
    remove_index :game_turns, :name=>'game_order_id_idx'
    add_index :game_turns, [:game_id, :round_number]
  end

  def self.down
    remove_index :game_turns, :column => [:game_id, :round_number]
    add_index :game_turns, [:game_id, :created_at], :name=>'game_order_id_idx'
  end
end
