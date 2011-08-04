class AddMoveCostSwampCastleToUnitType < ActiveRecord::Migration
  def self.up
    add_column :unit_types, :move_cost_swamp_castle, :integer
  end

  def self.down
    remove_column :unit_types, :move_cost_swamp_castle
  end
end
