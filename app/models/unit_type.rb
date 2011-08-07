class UnitType < ActiveRecord::Base
  validates :name, :presence=>true
  validates :img, :presence=>true
  validates :price, :presence=>true, :numericality => {:greater_than_or_equal_to => 0}
  validates :img_x, :presence=>true, :numericality => {:greater_than_or_equal_to => 0}
  validates :img_y, :presence=>true, :numericality => {:greater_than_or_equal_to => 0}
  validates :attack_range, :presence=>true, :numericality => {:greater_than_or_equal_to => 1}
  validates :move_range, :presence=>true, :numericality => {:greater_than_or_equal_to => 0}
  acts_as_list
  has_many :terrain_modifiers
end












# == Schema Information
#
# Table name: unit_types
#
#  id            :integer         not null, primary key
#  name          :string(255)
#  img           :string(255)
#  created_at    :datetime
#  updated_at    :datetime
#  position      :integer
#  attack_range  :integer         default(1), not null
#  move_range    :integer         default(2), not null
#  img_x         :integer         default(0), not null
#  img_y         :integer         default(0), not null
#  attack_power  :integer
#  defense_power :integer
#  price         :integer         default(100), not null
#

