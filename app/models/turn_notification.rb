class TurnNotification < ActiveRecord::Base
  validates :player_email, :presence=>true
  validates :game_name, :presence=>true
  validates :player, :presence=>true, :associated=>true
  validates :game, :presence=>true, :associated=>true
  belongs_to :game
  belongs_to :player
  
  def player=(player)
    self.player_id = player.id
    self.player_email = player.email
  end
  
  def game=(game)
    self.game_id = game.id
    self.game_name = game.name
  end
end



# == Schema Information
#
# Table name: turn_notifications
#
#  id           :integer         not null, primary key
#  player_id    :integer
#  game_id      :integer
#  game_name    :string(255)
#  player_email :string(255)
#  created_at   :datetime
#  updated_at   :datetime
#

