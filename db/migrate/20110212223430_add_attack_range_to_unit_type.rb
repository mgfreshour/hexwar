class AddAttackRangeToUnitType < ActiveRecord::Migration
  def self.up
    add_column :unit_types, :attack_range, :integer, :default => 1, :null => false
  end

  def self.down
    remove_column :unit_types, :attack_range
  end
end
