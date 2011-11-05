require 'spec_helper'

describe PlayersController do
  before(:each) do
    # "Log in" a player
    @player = mock_model(Player, :admin=>true).as_null_object
    @player.stub(:id=>54)
    controller.stub(:check_authentication)
    controller.stub(:need_to_update_profile)
    controller.stub(:current_player).and_return(@player)
  end
  
  before(:each) do
    @found_player = mock_model(Player).as_null_object
    Player.stub(:find=>@found_player)
  end

  describe "GET index" do
    it "checks for authenticated player" do
      controller.should_receive(:check_authentication)
      get :index
    end
    it "checks for admin" do
      controller.should_receive(:check_admin)
      get :index
    end
    it "renders 'index' template" do
      get :index
      response.should render_template('index')
    end
  end
  
  describe "GET show" do
    it "checks for authtenticated player" do
      controller.should_receive(:check_authentication)
      get :show, :id=>12
    end
    it "renders 'show' template" do
      get :show, :id=>12
      response.should render_template('show')
    end
  end
  
  describe "GET new" do
    it "checks for autenticated player" do
      controller.should_receive(:check_authentication)
      get :new
    end
    it "checks for admin" do
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
    it "redirects to root when non-admin player tries to edit other player" do
      @player.stub(:admin=>false)
      post :edit, :id=>12
      response.should redirect_to(root_url)
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
    it "checks for admin" do
      controller.should_receive(:check_admin)
      post :create
    end
    it "redirects to player index when save suceeds" do
      Player.stub(:new=>@found_player)
      post :create
      response.should redirect_to(players_url)
    end
    it "renders 'new' template when save fails" do
      @found_player.stub(:save=>false)
      Player.stub(:new=>@found_player)
      post :create
      response.should render_template('new')
    end
  end
  
  describe "PUT update" do
    before(:each) do
      @fb_graph = mock.as_null_object
      controller.stub(:faceboook_graph=>@fb_graph)
    end
    it "checks for authenticated player" do
      controller.should_receive(:check_authentication)
      put :update, :id=>12
    end
    it "redirects to root when non-admin player tries to edit other player" do
      @player.stub(:admin=>false)
      put :update, { :id=>12, :player => {} }
      response.should redirect_to(root_url)
    end
    it "prevents non admin players from saving the admin flag" do
      @player.stub(:admin=>false)
      @found_player.stub(:id=>@player.id)
      @found_player.should_receive(:update_attributes).with({ 'admin'=>false }).and_return(true)
      put :update, { :id=>@player.id, :player => { :admin=>true } }
    end
    it "updates the real_name and email from facebook data" do
      @player.stub(:admin=>false)
      @found_player.stub(:id=>@player.id)
      put :update, { :id=>@player.id, :player => { } }
    end
    it "renders 'edit' template when save fails" do
      @found_player.stub(:update_attributes=>false)
      put :update, { :id=>@player.id, :player => { } }
      response.should render_template('edit')
    end
  end
  
  describe "DELETE destroy" do
    it "checks for authenticated player" do
      controller.should_receive(:check_authentication)
      delete :destroy, :id=>12
    end
    it "checks for admin" do
      controller.should_receive(:check_admin)
      delete :destroy, :id=>12
    end
    it "redirects to player index" do
      delete :destroy, :id=>12
      response.should redirect_to(players_url)
    end
  end
end
