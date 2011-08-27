require 'spec_helper'

describe TurnNotification do
  it "sends emails for notifications older than 10 minutes old" do
    turn_notification = Factory(:turn_notification, :updated_at=>Time.now-10.minutes)
    TurnNotification.notify_by_email
    last_email.to.should include(turn_notification.player.email)
  end
  
  it "does not send emails for notifications less than 10 minutes old" do
    turn_notification = Factory(:turn_notification, :updated_at=>Time.now-9.minutes)
    TurnNotification.notify_by_email
    last_email.should be_nil
  end
  
  it "should not send emails to players with notify_by_email as false" do
    player = Factory(:player, :notify_by_email => false)
    turn_notification = Factory(:turn_notification, :player=>player, :updated_at=>Time.now-10.minutes)
    TurnNotification.notify_by_email
    last_email.should be_nil
  end
  
  it "should destroy notifications after sending email" do
    turn_notification = Factory(:turn_notification, :updated_at=>Time.now-10.minutes)
    TurnNotification.notify_by_email
    TurnNotification.find(:all).length.should == 0
  end
end