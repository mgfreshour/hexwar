class AddRealNameToPlayer < ActiveRecord::Migration
  def self.up
    add_column :players, :real_name, :string
    Player.find(:all).each do |player|
      player.real_name = player.name
      player.save
    end
  end

  def self.down
    remove_column :players, :real_name
  end
end
