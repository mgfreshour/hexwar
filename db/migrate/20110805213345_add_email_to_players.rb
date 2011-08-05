class AddEmailToPlayers < ActiveRecord::Migration
  def self.up
    add_column :players, :email, :string
  end

  def self.down
    remove_column :players, :email
  end
end
