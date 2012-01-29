require 'spec_helper'

describe ApplicationController do
  controller do
    def index
    end
  end
  
  describe "check_authorized_player prefilter" do
    it "redirects to sessions/new when not authorized" do
      get :index
      response.should redirect_to('/sessions/new')
    end
  end
  
  describe "check_admin prefilter" do
    it "should redirect to root when player is not admin" do
      @player = mock_model(Player, :admin=>false).as_null_object
      controller.stub(:check_authentication)
      controller.stub(:current_player).and_return(@player)
      get :index
      response.should redirect_to(root_url)
    end
  end

  describe "needs_profile_update prefilter" do
    it "should redirect to player edit when missing attributes" do
      @player = mock_model(Player, :notify_by_email=>nil).as_null_object
      controller.stub(:check_authentication)
      controller.stub(:check_admin)
      controller.stub(:current_player).and_return(@player)
      get :index
      response.should redirect_to(edit_player_path(@player))
    end
  end
end