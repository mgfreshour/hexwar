class RenameTurnActionParam1ToValue < ActiveRecord::Migration
  def self.up
    rename_column :turn_actions, :param1, :value
  end

  def self.down
    rename_column :turn_actions, :value, :param1
  end
end
