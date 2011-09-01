require 'spec_helper'

describe UnitType do
  before(:each) do
    @unit_type = Factory(:unit_type)
  end

  it "is valid with valid attributes" do
    @unit_type.should be_valid
  end
end

