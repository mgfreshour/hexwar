class CreateTurnActions < ActiveRecord::Migration
  def self.up
    create_table :turn_actions do |t|
      t.integer :turn_id
      t.string :action
      t.integer :unit_x
      t.integer :unit_y
      t.integer :target_x
      t.integer :target_y
      t.string :param1
      t.string :param2

      t.timestamps
    end
  end

  def self.down
    drop_table :turn_actions
  end
end
