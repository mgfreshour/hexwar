require 'spec_helper'

describe PlayersController do
  describe "GET index" do
    it "checks for authenticated player"
    it "checks for admin"
    it "renders 'index' template"
  end
  
  describe "GET show" do
    it "checks for authtenticated player"
    it "renders 'show' template"
  end
  
  describe "GET new" do
    it "checks for autenticated player"
    it "checks for admin"
    it "renders 'new' template"
  end
  
  describe "GET edit" do
    it "checks for authenticated player"
    it "redirects to root when non-admin player tries to edit other player"
    it "renders 'edit' template"
  end
  
  describe "POST create" do
    it "checks for authenticated player"
    it "checks for admin"
    it "redirects to player index when save suceeds"
    it "renders 'new' template when save fails"
  end
  
  describe "PUT update" do
    it "checks for authenticated player"
    it "redirects to root when non-admin player tries to edit other player"
    it "prevents non admin players from saving the admin flag"
    it "updates the real_name and email from facebook data"
    it "renders 'edit' template"
  end
  
  describe "DELETE destroy" do
    it "checks for authenticated player"
    it "checks for admin"
    it "redirects to player index"
  end
end
