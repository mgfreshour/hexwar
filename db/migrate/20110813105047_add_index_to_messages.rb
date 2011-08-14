class AddIndexToMessages < ActiveRecord::Migration
  def self.up
    add_index :messages, [:game_id, :created_at], :name=>'game_id_idx'
    add_index :message_viewers, :player_id, :name=>'player_id_idx'
  end

  def self.down
    remove_index :messages, :name=>'game_id_idx'
    remove_index :message_viewers, :name=>'player_id_idx'
  end
end
