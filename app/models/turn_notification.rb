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
    # strange cheat.  In MySql bool's are numbers, but in sqlite they are chars.  So use
    #  NULL to find the people with this.
    self.notify_by_email = player.notify_by_email ? true : nil
  end
  
  def game=(game)
    self.game_id = game.id
    self.game_name = game.name
  end
  
  def self.notify_by_email
    ret = "Notifying :\n"
    TurnNotification.find(:all, :conditions=>['updated_at < ? AND notify_by_email IS NOT NULL', Time.now-1.hour]).each do |note|
      Notifier.notify_turn(note.game_name, note.game_id, note.player_email, note.player_id).deliver
      ret += " - #{note.player_email}\t\t- #{note.game_name}\n"
      note.destroy
    end
    ret
  end
end




# == Schema Information
#
# Table name: turn_notifications
#
#  id              :integer         not null, primary key
#  player_id       :integer
#  game_id         :integer
#  game_name       :string(255)
#  player_email    :string(255)
#  notify_by_email :boolean
#  created_at      :datetime
#  updated_at      :datetime
#

