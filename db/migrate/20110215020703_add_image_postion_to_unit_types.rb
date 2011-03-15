class AddImagePostionToUnitTypes < ActiveRecord::Migration
  def self.up
    add_column :unit_types, :img_x, :integer, :default=>0, :null=>false
    add_column :unit_types, :img_y, :integer, :default=>0, :null=>false
  end

  def self.down
    remove_column :unit_types, :img_y
    remove_column :unit_types, :img_x
  end
end
