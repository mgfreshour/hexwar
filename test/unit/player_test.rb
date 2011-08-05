require 'test_helper'

class PlayerTest < ActiveSupport::TestCase
  # Replace this with your real tests.
  test "the truth" do
    assert true
  end
end






# == Schema Information
#
# Table name: players
#
#  id              :integer         not null, primary key
#  name            :string(255)
#  created_at      :datetime
#  updated_at      :datetime
#  uid             :string(255)
#  provider        :string(255)
#  admin           :boolean
#  email           :string(255)
#  notify_by_email :boolean
#

