require 'spec_helper'

describe Message do
  before(:each) do
    @message = Factory(:message)
  end

  it "is valid with valid attributes" do
    @message.should be_valid
  end
end

