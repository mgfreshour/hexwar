class RenameDataAndAddUnitDataToMap < ActiveRecord::Migration
  def self.up
    add_column :maps, :unit_data, :text
    rename_column :maps, :data, :tile_data
  end

  def self.down
    drop_column :maps, :unit_data
    rename_column :maps, :tile_data, :data
  end
end
