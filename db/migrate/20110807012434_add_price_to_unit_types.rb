class AddPriceToUnitTypes < ActiveRecord::Migration
  def self.up
    add_column :unit_types, :price, :integer, :default=>100, :null=>false
  end

  def self.down
    remove_column :unit_types, :price
  end
end
