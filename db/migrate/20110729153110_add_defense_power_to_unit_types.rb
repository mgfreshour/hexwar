class AddDefensePowerToUnitTypes < ActiveRecord::Migration
  def self.up
    add_column :unit_types, :defense_power, :integer
  end

  def self.down
    remove_column :unit_types, :defense_power
  end
end
