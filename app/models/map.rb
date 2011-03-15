class Map < ActiveRecord::Base
  serialize :tile_data
  serialize :unit_data
  has_many :games, :dependent => :destroy
  validates :name, :presence => true, :length => {:minimum => 4}
  validates :height, :presence=>true, :numericality => {:greater_than_or_equal_to => 2}
  validates :width, :presence=>true, :numericality => {:greater_than_or_equal_to => 2}
  validates :number_of_players, :presence=>true, :numericality=>{:greater_than_or_equal_to=>2, :less_than_or_equal_to=>4}
end



# == Schema Information
#
# Table name: maps
#
#  id                :integer         not null, primary key
#  name              :string(255)
#  tile_data         :text
#  created_at        :datetime
#  updated_at        :datetime
#  height            :decimal(, )
#  width             :decimal(, )
#  unit_data         :text
#  number_of_players :integer         default(2), not null
#

