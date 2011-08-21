class AddTokenToPlayer < ActiveRecord::Migration
  def self.up
    add_column :players, :token, :string
  end

  def self.down
    remove_column :players, :token
  end
end
