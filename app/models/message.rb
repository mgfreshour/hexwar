class Message < ActiveRecord::Base
  validates :text, :presence=>true
  validates :player, :presence=>true, :associated=>true
  belongs_to :game
  belongs_to :player
  has_many :message_viewers, :dependent => :destroy
  
  def save
    super()
    if self.game_id.nil?
      Player.find(:all).each do |audience|
        self.message_viewers << MessageViewer.new(:player=>audience)
      end
    end
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

