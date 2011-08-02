class AddOwnableToTileTypes < ActiveRecord::Migration
  def self.up
    add_column :tile_types, :ownable, :boolean
  end

  def self.down
    remove_column :tile_types, :ownable
  end
end
