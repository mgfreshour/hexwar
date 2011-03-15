class AddPositionToUnitTypes < ActiveRecord::Migration
  def self.up
    add_column :unit_types, :position, :integer
  end

  def self.down
    remove_column :unit_types, :position
  end
end
