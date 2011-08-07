require 'test_helper'

class UnitTypeTest < ActiveSupport::TestCase
  # Replace this with your real tests.
  test "the truth" do
    assert true
  end
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

