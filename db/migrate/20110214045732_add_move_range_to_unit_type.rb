class AddMoveRangeToUnitType < ActiveRecord::Migration
  def self.up
    add_column :unit_types, :move_range, :integer, :default => 2, :null => false
  end

  def self.down
    remove_column :unit_types, :move_range
  end
end
