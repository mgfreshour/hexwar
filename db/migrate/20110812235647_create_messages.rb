class CreateMessages < ActiveRecord::Migration
  def self.up
    create_table :messages do |t|
      t.text :text, :null=>false
      t.string :title
      t.integer :player_id, :null=>false
      t.integer :game_id

      t.timestamps
    end
  end

  def self.down
    drop_table :messages
  end
end
