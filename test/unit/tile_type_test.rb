require 'test_helper'

class TileTypeTest < ActiveSupport::TestCase
  # Replace this with your real tests.
  test "the truth" do
    assert true
  end
end





# == Schema Information
#
# Table name: tile_types
#
#  id                   :integer         not null, primary key
#  name                 :string(255)
#  img                  :string(255)
#  position             :integer
#  created_at           :datetime
#  updated_at           :datetime
#  img_x                :integer         default(0), not null
#  img_y                :integer         default(0), not null
#  ownable              :boolean
#  is_store             :boolean
#  unit_types_available :string(255)
#

