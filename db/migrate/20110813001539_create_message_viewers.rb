class CreateMessageViewers < ActiveRecord::Migration
  def self.up
    create_table :message_viewers do |t|
      t.integer :player_id
      t.integer :message_id

      t.timestamps
    end
  end

  def self.down
    drop_table :message_viewers
  end
end
