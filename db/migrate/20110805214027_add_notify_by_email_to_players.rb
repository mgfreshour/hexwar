class AddNotifyByEmailToPlayers < ActiveRecord::Migration
  def self.up
    add_column :players, :notify_by_email, :boolean
  end

  def self.down
    remove_column :players, :notify_by_email
  end
end
