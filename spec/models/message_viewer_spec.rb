require 'spec_helper'

describe MessageViewer do
  before(:each) do
    @message_viewer = Factory(:message_viewer)
  end

  it "is valid with valid attributes" do
    @message_viewer.should be_valid
  end
end

