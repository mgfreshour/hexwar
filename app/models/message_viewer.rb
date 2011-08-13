class MessageViewer < ActiveRecord::Base
  belongs_to :player
  belongs_to :message
  validates :player, :presence=>true, :associated=>true
  validates :message, :presence=>true, :associated=>true
  validates_uniqueness_of :player_id, :scope => :message_id
end

# == Schema Information
#
# Table name: message_viewers
#
#  id         :integer         not null, primary key
#  player_id  :integer
#  message_id :integer
#  created_at :datetime
#  updated_at :datetime
#

