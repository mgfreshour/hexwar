class AddHardSoftPowersToUnitType < ActiveRecord::Migration
  def self.up
    add_column :unit_types, :defense_type, :string, :default=>'soft', :null=>false
    add_column :unit_types, :soft_attack_power, :integer
    rename_column :unit_types, :attack_power, :hard_attack_power
  end

  def self.down
    remove_column :unit_types, :defense_type
    remove_column :unit_types, :soft_attack_power
    rename_column :unit_types, :hard_attack_power, :attack_power
  end
end
