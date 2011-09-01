require 'spec_helper'

describe TileType do
  before(:each) do
    @tile_type = Factory(:tile_type)
  end

  it "is valid with valid attributes" do
    @tile_type.should be_valid
  end
end

