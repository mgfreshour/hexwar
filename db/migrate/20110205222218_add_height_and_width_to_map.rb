class AddHeightAndWidthToMap < ActiveRecord::Migration
  def self.up
    add_column :maps, :height, :integer
    add_column :maps, :width, :integer
  end

  def self.down
    remove_column :maps, :width
    remove_column :maps, :height
  end
end
