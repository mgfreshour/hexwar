require 'spec_helper'

describe TurnNotification do
  before(:each) do
    @turn_notification = Factory(:turn_notification, :updated_at=>Time.now-10.minutes)
  end

  it "is valid with valid attributes" do
    @turn_notification.should be_valid
  end

  it "is not valid without a player email" do
    @turn_notification.player_email = nil
    @turn_notification.should_not be_valid
  end

  it "is not valid without a game name" do
    @turn_notification.game_name = nil
    @turn_notification.should_not be_valid
  end

  it "sends emails for notifications older than 10 minutes old" do
    TurnNotification.notify_by_email
    last_email.to.should include(@turn_notification.player.email)
  end
  
  it "does not send emails for notifications less than 10 minutes old" do
    @turn_notification.updated_at = Time.now-9.minutes
    @turn_notification.save
    TurnNotification.notify_by_email
    last_email.should be_nil
  end
  
  it "should not send emails to players with notify_by_email as false" do
    player = Factory(:player, :notify_by_email => false)
    @turn_notification.player = player
    @turn_notification.save
    TurnNotification.notify_by_email
    last_email.should be_nil
  end
  
  it "should destroy notifications after sending email" do
    TurnNotification.notify_by_email
    TurnNotification.find(:all).length.should == 0
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

