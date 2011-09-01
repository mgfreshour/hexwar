require 'spec_helper'

describe Player do
  before(:each) do
    @player = Factory(:player)
  end

  it "is valid with valid attributes" do
    @player.should be_valid
  end
end

