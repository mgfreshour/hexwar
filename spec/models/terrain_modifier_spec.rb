require 'spec_helper'

describe TerrainModifier do
  before(:each) do
    @terrain_modifier = Factory(:terrain_modifier)
  end

  it "is valid with valid attributes" do
    @terrain_modifier.should be_valid
  end
end

