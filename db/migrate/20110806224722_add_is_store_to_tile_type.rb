class AddIsStoreToTileType < ActiveRecord::Migration
  def self.up
    add_column :tile_types, :is_store, :boolean
    add_column :tile_types, :unit_types_available, :string
  end

  def self.down
    remove_column :tile_types, :unit_types_available
    remove_column :tile_types, :is_store
  end
end
