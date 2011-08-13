require 'test_helper'

class MessageTest < ActiveSupport::TestCase
  # Replace this with your real tests.
  test "the truth" do
    assert true
  end
end

# == Schema Information
#
# Table name: messages
#
#  id         :integer         not null, primary key
#  text       :text            default("Message Text"), not null
#  title      :string(255)
#  player_id  :integer         not null
#  game_id    :integer
#  created_at :datetime
#  updated_at :datetime
#

