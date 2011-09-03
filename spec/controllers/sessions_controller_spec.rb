require 'spec_helper'

describe SessionsController do
  describe "GET/POST new" do
    it "attempts to log existing player in with facebook cookies"
    it "attempts to log existing player in with signed request"
    it "creates a new player with facebook cookies"
    it "creates a new player with signed request"
    it "renders 'new' template when neither cookies or signed request are present"
    it "renders 'new' template when facebook login fails with error"
  end
  
  describe "GET destroy" do
    it "logs player out"
    it "renders 'destroy' template"
  end
end