require 'spec_helper'

describe GamePlayer do
  before(:each) do
    @game_player = Factory(:game_player)
  end

  it "is valid with valid attributes" do
    @game_player.should be_valid
  end

  it "is not valid without a player" do
    @game_player.player = nil
    @game_player.should_not be_valid
  end

  # it "is not valid without a game" do
  #   @game_player.game = nil
  #   @game_player.should_not be_valid
  # end
end

