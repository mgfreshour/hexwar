require 'test_helper'

class GameTurnTest < ActiveSupport::TestCase
  # Replace this with your real tests.
  test "the truth" do
    assert true
  end
end





# == Schema Information
#
# Table name: game_turns
#
#  id                      :integer         not null, primary key
#  round_number            :integer
#  game_id                 :integer
#  created_at              :datetime
#  updated_at              :datetime
#  start_unit_data         :text
#  current_unit_data       :text
#  end_unit_data           :text
#  player                  :string(255)
#  current_tile_owner_data :text
#  resource_data           :text
#

