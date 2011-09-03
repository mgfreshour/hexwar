require 'spec_helper'

describe MessagesController do
  before(:each) do
    # "Log in" a player
    @player = mock_model(Player, :admin=>true).as_null_object
    controller.stub(:check_authentication)
    controller.stub(:need_to_update_profile)
    controller.stub(:current_player).and_return(@player)
  end
  
  before(:each) do
    @message = mock_model(Message).as_null_object
    Message.stub(:find=>@message)
  end
  
  describe "GET index" do
    it "checks for an authenticated player" do
      controller.should_receive(:check_authentication)
      get :index
    end

    it "checks for admin rights" do
      controller.should_receive(:check_admin)
      get :index
    end

    it "renders 'index' template" do
      get :index
      response.should render_template('index')
    end
  end

  describe "GET show" do
    it "checks for an authenticated player" do
      controller.should_receive(:check_authentication)
      get :show, :id=>12
    end

    it "checks for admin rights" do
      controller.should_receive(:check_admin)
      get :show, :id=>12
    end
    
    it "renders 'show' template" do
      get :show, :id=>12
      response.should render_template('show')
    end
  end

  describe "GET new" do
    it "checks for an authenticated player" do
      controller.should_receive(:check_authentication)
      get :new
    end

    it "checks for admin rights" do
      controller.should_receive(:check_admin)
      get :new
    end

    it "renders 'new' template" do
      get :new
      response.should render_template('new')
    end
  end
  

  describe "GET edit" do
    it "checks for an authenticated player" do
      controller.should_receive(:check_authentication)
      get :edit, :id=>12
    end

    it "checks for admin rights" do
      controller.should_receive(:check_admin)
      get :edit, :id=>12
    end
    
    it "renders 'show' template" do
      get :edit, :id=>12
      response.should render_template('edit')
    end
  end
  
  

  describe "POST create" do
    before(:each) do
      @params = { :message => { }}
      Message.stub(:new=>@message)
    end

    it "checks for an authenticated player" do
      controller.should_receive(:check_authentication)
      post :create, @params
    end
    
    context "player is admin posting system wide message" do
      it "creates message views for all players" # TODO - this belongs in the message model

      it "redirects to messages url when record saved successfully" do
        post :create, @params
        response.should redirect_to(messages_url)
      end

      it "renders the new template when record fails to save"
    end
    
    context "player is posting a game message" do
      it "finds the game for that player"
      it "returns a json error when game for player is not found"
      it "returns a json okay when saved successfully"
      it "returns a json error when save fails"
    end
  end
  
  describe "PUT update" do
    it "checks for an authenticated player" do
      controller.should_receive(:check_authentication)
      put :update, :id=>12
    end

    it "checks for admin rights" do
      controller.should_receive(:check_admin)
      put :update, :id=>12
    end
    
    it "renders 'edit' template when save fails"
    it "redirects to message root when save suceeds"
    
  end
  
  
  describe "DELETE destroy" do
    it "checks for an authenticated player" do
      controller.should_receive(:check_authentication)
      delete :destroy, :id=>12
    end

    it "checks for admin rights" do
      controller.should_receive(:check_admin)
      delete :destroy, :id=>12
    end
  end
  
  describe "GET mark_as_read" do
    it "does something"
  end
end

