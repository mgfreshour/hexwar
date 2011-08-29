class AddIndexToMessages < ActiveRecord::Migration
  def self.up
    add_index :messages, [:game_id, :created_at]
    add_index :message_viewers, :player_id
  end

  def self.down
    remove_index :messages, :column => [:game_id, :created_at]
    remove_index :message_viewers, :column => [:player_id]
  end
end
