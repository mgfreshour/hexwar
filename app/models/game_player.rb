class GamePlayer < ActiveRecord::Base
  belongs_to :player
  accepts_nested_attributes_for :player
  validates :player, :presence=>true, :associated=>true
  validates_uniqueness_of :player_id, :scope => :game_id
  belongs_to :game
  validates :game, :presence=>true, :associated=>true
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

