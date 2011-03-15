class AddAdminFlagToPlayer < ActiveRecord::Migration
  def self.up
    add_column :players, :admin, :boolean
  end

  def self.down
    remove_column :players, :admin
  end
end
