class GameTurn < ActiveRecord::Base
  belongs_to :game
  has_many :turn_actions, :dependent => :destroy
  serialize :start_unit_data
  serialize :current_unit_data
  serialize :end_unit_data
end



# == Schema Information
#
# Table name: game_turns
#
#  id                :integer         not null, primary key
#  round_number      :integer
#  game_id           :integer
#  created_at        :datetime
#  updated_at        :datetime
#  start_unit_data   :text
#  current_unit_data :text
#  end_unit_data     :text
#  player            :string(255)
#

