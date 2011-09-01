require 'spec_helper'

describe GameTurn do
  before(:each) do
    @game_turn = Factory(:game_turn)
  end

  it "is valid with valid attributes" do
    @game_turn.should be_valid
  end

  it "is not valid without a game" do
    @game_turn.game = nil
    @game_turn.should_not be_valid
  end

  it "automatically assigns start unit data when given current data" do
    test_data = { :test=>'me' }
    @game_turn.current_unit_data = test_data
    @game_turn.start_unit_data.should include(test_data)
  end

  it "does not overwrite start unit data with current data when already set" do
    test_data = { :test=>'me' }
    test_data2 = { :test=>'me also' }
    @game_turn.start_unit_data = test_data
    @game_turn.current_unit_data = test_data2
    @game_turn.start_unit_data.should include(test_data)
  end
end

