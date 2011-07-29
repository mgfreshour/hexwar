class AddAttackPowerToUnitTypes < ActiveRecord::Migration
  def self.up
    add_column :unit_types, :attack_power, :integer
  end

  def self.down
    remove_column :unit_types, :attack_power
  end
end
