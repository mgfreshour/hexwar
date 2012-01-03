require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe MapsController do
  before(:each) do
    # "Log in" a player
    @player = mock_model(Player, :admin=>true).as_null_object
    controller.stub(:check_authentication)
    controller.stub(:need_to_update_profile)
    controller.stub(:current_player).and_return(@player)
  end

  before(:each) do
    @map = mock_model(Map).as_null_object
    Map.stub(:find=>@map)
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

    it "loads all maps" do
      Map.should_receive(:find).with(:all).and_return([])
      get :index
    end

    it "renders index template" do
      get :index
      response.should render_template('index')
    end
  end
  
  describe "GET show" do
    it "checks for an authenticated player" do
      controller.should_receive(:check_authentication)
      get :show, :id=>12
    end

    it "renders 'show' template" do
      get :show, :id=>12
      response.should render_template('show')
    end

    it "does not check authentication or admin on json requests" do
      controller.should_not_receive(:check_authentication)
      controller.should_not_receive(:check_admin)
      xhr :get, :show, :id=>12, :format=>:json
    end

    it "does not check authentication or admin on yaml requests" do
      controller.should_not_receive(:check_authentication)
      controller.should_not_receive(:check_admin)
      xhr :get, :show, :id=>12, :format=>:yaml
    end
  end
  
  describe "GET edit" do
    it "checks for an authenticated player" do
      controller.should_receive(:check_authentication)
      get :edit, :id=>12
    end

    it "checks admin" do
      controller.should_receive(:check_admin)
      get :edit, :id=>12
    end

    it "renders 'edit' template" do
      get :edit, :id=>12
      controller.should render_template('edit')
    end
  end
  
  describe "POST create" do
    it "checks for an authenticated player" do
      controller.should_receive(:check_authentication)
      post :create
    end

    it "checks admin" do
      controller.should_receive(:check_admin)
      post :create
    end

    it "creates and updates a new map" do
      Map.should_receive(:new).and_return(@map)
      @map.should_receive(:update_attributes).and_return(true)
      post :create
    end
  end
  
  describe "PUT update" do
    it "checks for an authenticated player" do
      controller.should_receive(:check_authentication)
      put :update, :id=>12
    end

    it "checks admin" do
      controller.should_receive(:check_admin)
      put :update, :id=>12
    end

    it "loads and updates a new map" do
      Map.should_receive(:find).with('12').and_return(@map)
      @map.should_receive(:update_attributes).and_return(true)
      put :update, :id=>12
    end
  end
  
  describe "DELETE destroy" do
    it "checks for an authenticated player" do
      controller.should_receive(:check_authentication)
      delete :destroy, :id=>12
    end

    it "checks admin" do
      controller.should_receive(:check_admin)
      delete :destroy, :id=>12
    end

    it "loads and deletes the correct record" do
      @map.should_recieve(:destroy)
      Map.should_receive(:find).with('12').and_return(@map)
      delete :destroy, :id=>12
    end
  end
end