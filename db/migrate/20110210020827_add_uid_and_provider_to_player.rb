class AddUidAndProviderToPlayer < ActiveRecord::Migration
  def self.up
    add_column :players, :uid, :string
    add_column :players, :provider, :string
  end

  def self.down
    remove_column :players, :provider
    remove_column :players, :uid
  end
end
