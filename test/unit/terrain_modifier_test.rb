require 'test_helper'

class TerrainModifierTest < ActiveSupport::TestCase
  # Replace this with your real tests.
  test "the truth" do
    assert true
  end
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

