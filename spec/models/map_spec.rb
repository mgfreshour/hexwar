require 'spec_helper'

describe Map do
  before(:each) do
    @map = Factory(:map)
  end

  it "is valid with valid attributes" do
    @map.should be_valid
  end

  it "is not valid without a name" do
    @map.name = nil
    @map.should_not be_valid
  end

  it "is not valid without a height" do
    @map.height = nil
    @map.should_not be_valid
  end

  it "is not valid with a height < 2" do
    @map.height = 1
    @map.should_not be_valid
  end

  it "is not valid without a width" do
    @map.width = nil
    @map.should_not be_valid
  end

  it "is not valid with a width < 2" do
    @map.width = 1
    @map.should_not be_valid
  end

  it "is not valid without a number of players" do
    @map.number_of_players = nil
    @map.should_not be_valid
  end

  it "is not valid without a unit data" do
    @map.unit_data = nil
    @map.should_not be_valid
  end
end

