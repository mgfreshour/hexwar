class GamesController < ApplicationController
  skip_filter :check_admin
  
  #
  # GET /games
  #
  def index
    @games = current_player.games.find(:all)

    respond_to do |format|
      format.html # index.html.erb
    end
  end

  #
  # GET /games/1
  #
  def show
    begin
      if current_player.admin
        @game = Game.find(params[:id])
      else
        @game = current_player.games.find(params[:id])
      end

      @current_player_team = @game.get_players_team(current_player)

      respond_to do |format|
        format.html # show.html.erb
      end

    rescue ActiveRecord::RecordNotFound => e
      flash[:notice] = "Unable to find game #{params[:id]}!"
      redirect_to games_path
    end
  end

  #
  # GET /games/new
  #
  def new
    @maps = Map.find(:all)
    @game = Game.new
    
    @players = current_player.get_friends

    @game.game_players = [GamePlayer.new({:team => 'red', :player => current_player}),
                          GamePlayer.new({:team => 'green'})];
    # Logic for number of players needs to move to _form
    #@game.game_players << GamePlayer.new({:team=>'white'}) if @game.map.number_of_players >= 3
    #@game.game_players << GamePlayer.new({:team=>'blue'}) if @game.map.number_of_players == 4

    respond_to do |format|
      format.html # new.html.erb
    end
  end

  #
  # POST /games
  #
  def create
    exclude_list = []
    params[:game][:game_players_attributes].each_pair do |idx,game_player|
      if params[:game][:game_players_attributes][idx][:player_id] == ''
        opponent_id = current_player.get_random_opponent(exclude_list).id
        exclude_list << opponent_id
        params[:game][:game_players_attributes][idx][:player_id] = opponent_id
      end
    end

    @game = Game.new(params[:game])

    respond_to do |format|
      if @game.save && @game.create_new_turn('red', { current_unit_data:@game.map.unit_data })
        format.html { redirect_to(games_url, :notice => 'Game was successfully created.') }
      else
        @players = current_player.get_friends
        format.html { render :action => "new" }
      end
    end
  end

  #
  # DELETE /games/1
  #
  def destroy
    if current_player.admin
      @game = Game.find(params[:id])
    else
      @game = current_player.games.find(params[:id])
    end
    @game.destroy

    respond_to do |format|
      format.html { redirect_to(games_url, :notice => 'Game deleted.') }
    end
  end
  
  #
  # POST /games/end_turn?id=1
  #
  def end_turn
    @game = current_player.games.find(params[:id], :readonly => false)

    unless params[:game_winner].blank? 
      @game.save_current_turn(params[:game_turn])
      @game.game_winner = params[:game_winner]
      @game.save
    else
      @game.end_turn(current_player, params[:game_turn])
    end

    respond_to do |format|
      format.json { render :json => true }
    end
  end
  
  # 
  # GET /games/is_it_my_turn?player_id=1
  #
  def is_it_my_turn
    turn_notifications = current_player.turn_notifications.find(:all)

    respond_to do |format|
      format.json { render :json => turn_notifications }
    end
    
    current_player.turn_notifications.destroy_all()
  end
  
  #
  # GET /games/get_turn?id=1
  #
  def get_turn
    @game = current_player.games.find(params[:id])

    @game.clear_notifications(current_player)
    
    respond_to do |format|
      format.json { render :json => @game.current_turn }
    end
  end
end
