require 'test_helper'

class GamePlayersTest < ActiveSupport::TestCase
  # Replace this with your real tests.
  test "the truth" do
    assert true
  end
end

# == Schema Information
#
# Table name: game_players
#
#  id         :integer         not null, primary key
#  game_id    :integer
#  player_id  :integer
#  team       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

