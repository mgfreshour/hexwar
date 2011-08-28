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
    it "renders 'new' template"
  end

end