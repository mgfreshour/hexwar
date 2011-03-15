class CreateGameTurns < ActiveRecord::Migration
  def self.up
    create_table :game_turns do |t|
      t.integer :round_number
      t.integer :game_id

      t.timestamps
    end
  end

  def self.down
    drop_table :game_turns
  end
end
