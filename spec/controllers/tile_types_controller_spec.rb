require 'spec_helper'

describe TileTypesController do
  before(:each) do
    # "Log in" a player
    @player = mock_model(Player, :admin=>true).as_null_object
    @player.stub(:id=>54)
    controller.stub(:check_authentication)
    controller.stub(:need_to_update_profile)
    controller.stub(:current_player).and_return(@player)
  end
  
  before(:each) do
    @tile_type = mock_model(TileType).as_null_object
    TileType.stub(:find=>@tile_type)
  end
  
  describe "GET index" do
    it "checks for authenticated player" do
      controller.should_receive(:check_authentication)
      get :index
    end

    it "renders 'index' template" do
      get :index
      response.should render_template('index')
    end
  end
  
  describe "GET show" do
    it "checks for authenticated player" do
      controller.should_receive(:check_authentication)
      get :show, :id=>12
    end
    it "checks for admin"   do
      controller.should_receive(:check_admin)
      get :show, :id=>12
    end
    it "renders 'show' template" do
      get :show, :id=>12
      response.should render_template('show')
    end
  end
  
  describe "GET new" do
    it "checks for authenticated player" do
      controller.should_receive(:check_authentication)
      get :new
    end
    it "checks for admin"   do
      controller.should_receive(:check_admin)
      get :new
    end
    it "renders 'new' template" do
      get :new
      response.should render_template('new')
    end
  end
  
  describe "GET edit" do
    it "checks for authenticated player" do
      controller.should_receive(:check_authentication)
      get :edit, :id=>12
    end
    it "checks for admin"   do
      controller.should_receive(:check_admin)
      get :edit, :id=>12
    end
    it "renders 'edit' template" do
      get :edit, :id=>12
      response.should render_template('edit')
    end
  end
  
  describe "POST create" do
    it "checks for authenticated player" do
      controller.should_receive(:check_authentication)
      post :create
    end
    it "checks for admin"   do
      controller.should_receive(:check_admin)
      post :create
    end
    it "redirects to tile type index when save suceeds" do
      TileType.stub(:new=>@tile_type)
      @tile_type.stub(:save=>true)
      post :create
      response.should redirect_to(tile_types_url)
    end
    it "renders 'new' template when save fails" do
      TileType.stub(:new=>@tile_type)
      @tile_type.stub(:save=>false)
      post :create
      response.should render_template('new')
    end
  end
  
  describe "PUT update" do
    it "checks for authenticated player" do
      controller.should_receive(:check_authentication)
      put :update, :id=>12
    end
    it "checks for admin"   do
      controller.should_receive(:check_admin)
      put :update, :id=>12
    end
    it "redirects to tile type index when save suceeds" do
      put :update, :id=>12
      response.should redirect_to(tile_types_url)
    end
    it "renders 'edit' template when save fails" do
      @tile_type.stub(:update_attributes=>false)
      TileType.should_receive(:find).and_return(@tile_type)
      put :update, :id=>12
      response.should render_template('edit')
    end
  end
  
  describe "DELETE destroy" do
    it "checks for authenticated player" do
      controller.should_receive(:check_authentication)
      delete :destroy, :id=>12
    end
    it "checks for admin"   do
      controller.should_receive(:check_admin)
      delete :destroy, :id=>12
    end
    it "redirects to tile type index" do
      delete :destroy, :id=>12
      response.should redirect_to(tile_types_url)
    end
  end
end
