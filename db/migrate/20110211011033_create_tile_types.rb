class CreateTileTypes < ActiveRecord::Migration
  def self.up
    create_table :tile_types do |t|
      t.string :name
      t.string :img
      t.integer :position

      t.timestamps
    end
  end

  def self.down
    drop_table :tile_types
  end
end
