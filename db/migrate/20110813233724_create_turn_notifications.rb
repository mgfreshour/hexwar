class CreateTurnNotifications < ActiveRecord::Migration
  def self.up
    create_table :turn_notifications do |t|
      t.integer :player_id
      t.integer :game_id
      t.string :game_name
      t.string :player_email
      t.timestamps
    end
    
    add_index :turn_notifications, :player_id
  end

  def self.down
    remove_index :turn_notifications, :player_id
    drop_table :turn_notifications
  end
end
