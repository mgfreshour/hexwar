require 'spec_helper'

describe SessionsController do
  describe "GET/POST new" do
    before(:each) do
      @oauth = mock.as_null_object
      controller.stub(:oauth=>@oauth)
      @player = mock_model(Player).as_null_object
      @player.stub(:id=>57, :uid=>888)
    end

    it "attempts to log existing player in with facebook cookies" do
      from_cookies = { 'access_token'=>'myToken', 'user_id'=>@player.uid, 'expires'=>Time.now+15.minutes }
      @oauth.stub(:get_user_info_from_cookies=>from_cookies)
      Player.stub(:find_by_provider_and_uid=>@player)
      get :new
      session[:player_id].should == @player.id
    end

    it "attempts to log existing player in with signed request" do
      session[:signed_request] = 'mySignedRequest'
      from_signed_req = { :oauth_token=>'myToken', 'user_id'=>@player.uid }
      @oauth.stub(:get_user_info_from_cookies=>false, :parse_signed_request=>from_signed_req)
      Player.stub(:find_by_provider_and_uid=>@player)
      get :new
      session[:player_id].should == @player.id
    end

    it "creates a new player with facebook cookies" do
      from_cookies = { 'access_token'=>'myToken', 'user_id'=>@player.uid, 'expires'=>Time.now+15.minutes }
      @oauth.stub(:get_user_info_from_cookies=>from_cookies)
      Player.stub(:find_by_provider_and_uid=>false)
      Player.should_receive(:create_with_omniauth).with('facebook',@player.uid,from_cookies['access_token']).and_return(@player)
      get :new
      session[:player_id].should == @player.id
    end

    it "creates a new player with signed request" do
      session[:signed_request] = 'mySignedRequest'
      from_signed_req = { :oauth_token=>'myToken', 'user_id'=>@player.uid }
      @oauth.stub(:get_user_info_from_cookies=>false, :parse_signed_request=>from_signed_req)
      Player.stub(:find_by_provider_and_uid=>false)
      Player.should_receive(:create_with_omniauth).with('facebook',@player.uid,from_signed_req[:oauth_token]).and_return(@player)
      get :new
      session[:player_id].should == @player.id
    end

    it "renders 'new' template when neither cookies or signed request are present" do
      @oauth.stub(:get_user_info_from_cookies=>false, :parse_signed_request=>false)
      get :new
      response.should render_template('new')
    end

    it "renders 'new' template when facebook login fails with error" do
      @oauth.should_receive(:get_user_info_from_cookies).and_raise(Koala::Facebook::APIError)
      get :new
      response.should render_template('new')
    end
  end
  
  describe "GET destroy" do
    it "logs player out" do
      session[:player_id] = 57
      get :destroy
      session[:player_id].should == nil
    end
    it "renders 'destroy' template" do
      get :destroy
      response.should render_template('destroy')
    end
  end
end