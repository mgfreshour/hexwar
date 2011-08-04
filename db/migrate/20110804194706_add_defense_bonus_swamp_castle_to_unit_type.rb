class AddDefenseBonusSwampCastleToUnitType < ActiveRecord::Migration
  def self.up
    add_column :unit_types, :defense_bonus_swamp_castle, :integer
  end

  def self.down
    remove_column :unit_types, :defense_bonus_swamp_castle
  end
end
