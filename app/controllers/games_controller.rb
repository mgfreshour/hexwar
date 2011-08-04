class GamesController < ApplicationController
  skip_filter :check_admin
    
  # GET /games
  # GET /games.xml
  def index
    if @current_player.admin
      @games = Game.find(:all)
    else
      @games = @current_player.games.find(:all)
    end

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @games }
    end
  end

  # GET /games/1
  # GET /games/1.xml
  def show
    if @current_player.admin
      @game = Game.find(params[:id])
    else
      @game = @current_player.games.find(params[:id])
    end
    
    @game.game_players.each do |game_player|	
		  @current_player_team = game_player.team if game_player.player == @current_player
  	end

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @game }
    end
  end

  # GET /games/new
  # GET /games/new.xml
  def new
    @maps = Map.find(:all)
    @game = Game.new
    map_id = params[:map] ? params[:map] : @maps[0].id
    @game.map_id = map_id
    @players = Player.find(:all, :conditions => ["id <> #{@current_player.id}"])
    @game.game_players = [GamePlayer.new({:team => 'red', :player => @current_player}),
                          GamePlayer.new({:team=>'green'})];
    @game.game_players << GamePlayer.new({:team=>'white'}) if @game.map.number_of_players >= 3
    @game.game_players << GamePlayer.new({:team=>'blue'}) if @game.map.number_of_players == 4

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @game }
    end
  end

  # # GET /games/1/edit
  # def edit
  #   @game = Game.find(params[:id])
  #   redirect_to(@game) 
  # end

  # POST /games
  # POST /games.xml
  def create
    @game = Game.new(params[:game])
    @players = Player.find(:all, :conditions => ["id <> #{@current_player.id}"])

    respond_to do |format|
      if @game.save && @game.create_new_turn('red', @game.map.unit_data)
        # Create the first game turn
        format.html { redirect_to(games_url, :notice => 'Game was successfully created.') }
      else
        format.html { render :action => "new" }
      end
    end
  end

  # # PUT /games/1
  # # PUT /games/1.xml
  # def update
  #   @game = Game.find(params[:id])
  # 
  #   respond_to do |format|
  #     if @game.update_attributes(params[:game])
  #       format.html { redirect_to(games_url, :notice => 'Game was successfully updated.') }
  #       format.xml  { head :ok }
  #     else
  #       format.html { render :action => "edit" }
  #       format.xml  { render :xml => @game.errors, :status => :unprocessable_entity }
  #     end
  #   end
  # end

  # DELETE /games/1
  # DELETE /games/1.xml
  def destroy
    if @current_player.admin
      @game = Game.find(params[:id])
    else
      @game = @current_player.games.find(params[:id])
    end
    @game.destroy

    respond_to do |format|
      format.html { redirect_to(games_url) }
      format.xml  { head :ok }
    end
  end
  
  #
  # GET /games/end_turn?id=1
  #
  def end_turn
    if @current_player.admin
      @game = Game.find(params[:id])
    else
      @game = @current_player.games.find(params[:id], :readonly => false)
    end

    unless params[:game_winner].blank?
      @game.save_current_turn(params[:game_turn])
      @game.game_winner = params[:game_winner]
      @game.save
    else
      @game.end_turn(params[:game_turn])
    end

    respond_to do |format|
      format.json { render :json => true }
    end
  end
  
  #
  # GET /games/get_turn?id=1
  #
  def get_turn
    if @current_player.admin
      @game = Game.find(params[:id])
    else
      @game = @current_player.games.find(params[:id])
    end

    respond_to do |format|
      format.json { render :json => @game.current_turn }
    end
  end
end
