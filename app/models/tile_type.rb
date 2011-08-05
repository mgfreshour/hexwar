class TileType < ActiveRecord::Base
  validates :name, :presence=>true
  validates :img, :presence=>true
  validates :img_x, :presence=>true, :numericality => {:greater_than_or_equal_to => 0}
  validates :img_y, :presence=>true, :numericality => {:greater_than_or_equal_to => 0}
  acts_as_list
  has_many :terrain_modifiers
end



# == Schema Information
#
# Table name: tile_types
#
#  id         :integer         not null, primary key
#  name       :string(255)
#  img        :string(255)
#  position   :integer
#  created_at :datetime
#  updated_at :datetime
#  img_x      :integer         default(0), not null
#  img_y      :integer         default(0), not null
#  ownable    :boolean
#

