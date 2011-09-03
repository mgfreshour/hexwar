require 'spec_helper'

describe UnitTypesController do
  describe "GET index" do
    it "checks for authenticated player"
    it "checks for admin"
    it "renders 'index' template"
  end
  
  describe "GET show" do
    it "checks for authtenticated player"
    it "checks for admin"
    it "renders 'show' template"
  end
  
  describe "GET new" do
    it "checks for autenticated player"
    it "checks for admin"
    it "renders 'new' template"
  end
  
  describe "GET edit" do
    it "checks for authenticated player"
    it "checks for admin"
    it "renders 'edit' template"
  end
  
  describe "POST create" do
    it "checks for authenticated player"
    it "checks for admin"
    it "redirects to unit type index when save suceeds"
    it "renders 'new' template when save fails"
  end
  
  describe "PUT update" do
    it "checks for authenticated player"
    it "checks for admin"
    it "redirects to unit type index when save suceeds"
    it "renders 'edit' template when save fails"
  end
  
  describe "DELETE destroy" do
    it "checks for authenticated player"
    it "checks for admin"
    it "redirects to unit type index"
  end
end
