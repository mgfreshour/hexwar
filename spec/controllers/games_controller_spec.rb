require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe GamesController do
  before(:each) do
    # "Log in" a player
    @player = mock_model(Player, :admin=>false).as_null_object
    @player.stub(:games).and_return(mock('Games').as_null_object)
    @player.stub(:turn_notifications).and_return(mock('TurnNotifications'))
    controller.stub(:check_authentication)
    controller.stub(:need_to_update_profile)
    controller.stub(:current_player).and_return(@player)
  end

  describe "GET index" do
    it "checks for an authenticated player" do
      controller.should_receive(:check_authentication)
      get :index
    end

    it "looks up current player's games" do
      @player.should_receive(:games).once.and_return([1,2,3])
      get :index
    end

    it "renders 'index' template" do
      get :index
      response.should render_template('index')
    end
  end # "GET index"
  
  describe "GET show" do
    it "checks for an authenticated player" do
      controller.should_receive(:check_authentication)
      get :show, :id=>12
    end

    context "player is admin" do
      it "should search all games" do
        @player.stub(:admin=>true)
        Game.should_receive(:find).with('12').once.and_return(mock_model(Game).as_null_object)
        get :show, :id=>12
      end
    end
    
    context "player is not admin" do
      it "should search player's games" do
        @player.games.should_receive(:find).with('12').once.and_return(mock_model(Game).as_null_object)
        get :show, :id=>12
      end
    end
    

    context "game is found" do
      it "renders 'show' template" do
        @player.games.stub(:find=>mock_model(Game).as_null_object)
        get :show, :id=>12
        response.should render_template('show')
      end
    end
    
    context "game is not found" do        
      before(:each) do
        @player.games.should_receive(:find).and_raise(ActiveRecord::RecordNotFound)
      end

      it "should redirect to index" do
        get :show, :id=>14
        response.should redirect_to(games_path)
      end
      
      it "should flash notice that game is not found" do
        get :show, :id=>14
        flash[:notice].should include('Unable to find game')
      end
    end
  end # "GET show"
  
  describe "GET new" do
    it "checks for an authenticated player" do
      controller.should_receive(:check_authentication)
      get :new
    end

    it "renders 'new' template" do
      Map.stub(:find=>[mock_model(Map).as_null_object])
      get :new
      response.should render_template('new')
    end
  end
  
  
  describe "POST create" do
    before(:each) do
      @game_params = {"game"=>{"map_id"=>"1", "name"=>"sdfg", 
        "game_players_attributes"=>{"0"=>{"team"=>"red", "player_id"=>"3"}, 
                                    "1"=>{"team"=>"green", "player_id"=>""}}}}
      @player.stub(:get_random_opponent).and_return(mock(Player).as_null_object)
    end

    it "checks for an authenticated player" do
      controller.should_receive(:check_authentication)
      post :create, @game_params
    end

    context "game and turn are created successfully" do
      before(:each) do
        @game = mock_model('Game').as_null_object
        @game.stub(:save=>true, :create_new_turn=>true, :map=>mock_model('Map').as_null_object)
        Game.stub(:new=>@game)
      end

      it "redirects to root_url" do
        post :create, @game_params
        response.should redirect_to(games_path)
      end
    
      it "creates a new turn" do
        @game.should_receive(:create_new_turn).once
        post :create, @game_params
      end

      it "gets random players when told too" do
        @player.should_receive(:get_random_opponent).once.and_return(mock.as_null_object)
        post :create, @game_params
      end
    end
    
    context "game save fails" do
      it "renders 'new' template" do
        @game = mock_model('Game', :save=>false).as_null_object
        Game.stub(:new=>@game)
        post :create, @game_params
        response.should render_template('new')
      end
    end
  end
  
  describe "DELETE destroy" do
    it "checks for an authenticated player" do
      controller.should_receive(:check_authentication)
      delete :destroy, :id=>14
    end

    # it "checks for admin rights" do
    #   controller.should_receive(:check_admin)
    #   delete :destroy, :id=>14
    # end

    it "redirects to games root" do
      delete :destroy, :id=>14
      response.should  redirect_to(games_path)
    end
    
    it "should flash notice about game deletion" do
      delete :destroy, :id=>14
      flash[:notice].should include('Game deleted')
    end
  end

  describe "XHR POST end_turn" do
    it "checks for an authenticated player" do
      controller.should_receive(:check_authentication)
      xhr :post, :end_turn
    end

    it "returns true on success" do
      xhr :post, :end_turn
      response.body.should include(true.to_json)
    end
    
    it "ends the game turn" do
      game = mock_model('Game').as_null_object
      game.should_receive(:end_turn).once
      @player.games.stub(:find=>game)
      xhr :post, :end_turn
    end
    
    it "sets winner when passed" do
      game = mock_model('Game').as_null_object
      game.should_receive(:game_winner=).once.with('red')
      @player.games.stub(:find=>game)
      xhr :post, :end_turn, { :game_winner=>'red' }
    end
  end
  
  describe "XHR GET is_it_my_turn" do
    it "checks for an authenticated player" do
      @player.turn_notifications.stub(:find=>true, :destroy_all=>true)
      controller.should_receive(:check_authentication)
      xhr :get, :is_it_my_turn
    end
    
    it "returns json of all notifications" do
      @player.turn_notifications.stub(:find=>['test1', 'test2'], :destroy_all=>true)
      xhr :get, :is_it_my_turn
      response.body.should include(['test1', 'test2'].to_json)
    end
    
    it "clears player's notifcations after call" do
      @player.turn_notifications.stub(:find=>true)
      @player.turn_notifications.should_receive(:destroy_all).once
      xhr :get, :is_it_my_turn
    end
  end
  
  describe "XHR GET get_turn" do
    it "checks for an authenticated player" do
      controller.should_receive(:check_authentication)
      xhr :get, :get_turn
    end

    it "return json of current turn" do
      game = mock_model(Game, :clear_notifications=>true, :current_turn=>{:uh=>'oh',:bobo=>'the clown'})
      @player.games.stub(:find=>game)
      xhr :get, :get_turn
      response.body.should include({:uh=>'oh',:bobo=>'the clown'}.to_json)
    end
    
    it "clears current players notifications for game" do
      game = mock_model(Game, :current_turn=>{:uh=>'oh',:bobo=>'the clown'})
      game.should_receive(:clear_notifications).once
      @player.games.stub(:find=>game)
      xhr :get, :get_turn
    end
  end
end