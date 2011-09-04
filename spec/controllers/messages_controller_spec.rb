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
      it "redirects to messages url when record saved successfully" do
        post :create, @params
        response.should redirect_to(messages_url)
      end

      it "renders the new template when record fails to save" do
        @message.stub(:save=>false)
        Message.stub(:new=>@message)
        post :create, @params
        response.should render_template('new')
      end
    end
    
    context "player is posting through XHR a game message" do
      before(:each) do
        @params[:message][:game_id] = 12
      end
      it "finds the game for that player" do
        @player.games.should_receive(:find).with(@params[:message][:game_id]).and_return(mock_model(Game).as_null_object)
        xhr :post, :create, @params
      end
      it "returns a json error when game for player is not found" do
        @player.games.should_receive(:find).and_raise(ActiveRecord::RecordNotFound)
        xhr :post, :create, @params
        response.body.should include(false.to_json)
      end
      it "returns renders 'create' template when saved successfully" do
        xhr :post, :create, @params
        response.should render_template('create')
      end
      it "returns a json error when save fails" do
        Message.stub(:new=>@message)
        @message.stub(:save=>false)
        xhr :post, :create, @params
        response.body.should include(false.to_json)
      end
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
    
    it "renders 'edit' template when save fails" do
      @message.should_receive(:update_attributes).and_return(false)
      put :update, :id=>12
      response.should render_template('edit')
    end
    it "redirects to message root when save suceeds" do
      put :update, :id=>12
      response.should redirect_to(messages_url)
    end
    
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
  
  describe "POST mark_read" do
    it "searches for message belonging to current user" do
      MessageViewer.should_receive(:find_by_player_id_and_message_id).with(@player.id,12).and_return(@message)
      post :mark_read, :id=>12
    end
    
    it "deletes users message" do
      @message.should_receive(:destroy)
      MessageViewer.stub(:find_by_player_id_and_message_id => @message)
      post :mark_read, :id=>12
    end
  end
end

