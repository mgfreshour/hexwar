class TerrainModifier < ActiveRecord::Base
  belongs_to :unit_type
  belongs_to :tile_type
end

# == Schema Information
#
# Table name: terrain_modifiers
#
#  id             :integer         not null, primary key
#  unit_type_id   :integer
#  tile_type_id   :integer
#  defense_bonus  :integer
#  movement_cost  :integer
#  tile_type_name :string(255)
#  created_at     :datetime
#  updated_at     :datetime
#

