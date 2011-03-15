require 'test_helper'

class MapTest < ActiveSupport::TestCase
  # Replace this with your real tests.
  test "the truth" do
    assert true
  end
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

