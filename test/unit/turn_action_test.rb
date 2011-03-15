require 'test_helper'

class TurnActionTest < ActiveSupport::TestCase
  # Replace this with your real tests.
  test "the truth" do
    assert true
  end
end


# == Schema Information
#
# Table name: turn_actions
#
#  id           :integer         not null, primary key
#  game_turn_id :integer
#  action       :string(255)
#  unit_x       :integer
#  unit_y       :integer
#  target_x     :integer
#  target_y     :integer
#  value        :string(255)
#  param2       :string(255)
#  created_at   :datetime
#  updated_at   :datetime
#

