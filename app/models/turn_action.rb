class TurnAction < ActiveRecord::Base
  belongs_to :game_turn
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

