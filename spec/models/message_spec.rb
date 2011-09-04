require 'spec_helper'

describe Message do
  before(:each) do
    @message = Factory(:message)
  end

  it "is valid with valid attributes" do
    @message.should be_valid
  end
  
  it "is not valid without text" do
    @message.text = nil
    @message.should_not be_valid
  end
  
  it "is not valid without a player" do
    @message.player = nil
    @message.should_not be_valid
  end
  
  it "creates a message view for every player when not attached to a game" do
    p1 = Factory(:player)
    p2 = Factory(:player)
    global_message = Message.new({:player=>p1, :text=>'test me'})
    expect { global_message.save }.to change(MessageViewer, :count).by(Player.count)
  end
  
  it "does not create message views when attached to a game" do
    game_message = Message.new({:player=>Factory(:player), :text=>'test2', :game=>Factory(:game)})
    expect { game_message.save }.to change(MessageViewer, :count).by(0)
  end
end

