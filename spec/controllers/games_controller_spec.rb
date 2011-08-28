require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe GamesController do
  before(:each) do
    # "Log in" a player
    @player = mock_model(Player, :admin=>false).as_null_object
    @player.games = mock('Games')
    controller.stub(:check_authentication)
    controller.stub(:need_to_update_profile)
    controller.stub(:current_player).and_return(@player)
  end

  describe "GET index" do
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
    context "player is admin" do
      it "should search all games" do
        @player.stub(:admin=>true)
        Game.should_receive(:find).with(12).once.and_return(mock_model(Game).as_null_object)
        get :show, :id=>12
      end
    end
    
    context "player is not admin" do
      it "should search player's games" do
        @player.games.should_receive(:find).with(12).once.and_return(mock_model(Game).as_null_object)
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
        flash[:notice].should include('Unable to find game 14!')
      end
    end
  end # "GET show"
  
  describe "GET new" do
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
    end

    context "game and turn are created successufully" do
      it "redirects to root_url" do
        Game.stub(:new=>mock_model('Game').as_null_object)
        post :create, @game_params
        response.should redirect_to(games_path)
      end
    
      it "creates a new turn"
      it "gets random players when told too"
    end
    
    context "game save fails" do
      it "renders 'new' template"
    end
  end
  
  describe "DELETE destroy" do
    it "redirects to games root" do
      delete :destroy, :id=>14
      response.should  redirect_to(games_path)
    end
    
    it "should flash notice about game deletion" do
      delete :destroy, :id=>14
      flash[:notice].should include('Game deleted')
    end
  end

  describe "POST end_turn" do
    it "does something"
  end
  
  describe "GET is_it_my_turn" do
    it "does something"
  end
  
  describe "GET get_turn" do
    it "does something"
  end
end