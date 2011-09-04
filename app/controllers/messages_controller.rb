class MessagesController < ApplicationController
  skip_filter :check_admin
  before_filter :check_admin, :except=>[:create,:mark_read]
  
  #
  # POST /messages/1/mark_read
  #
  def mark_read
    @message_id = params[:id]
    message_viewer = MessageViewer.find_by_player_id_and_message_id(current_player.id, @message_id)
    message_viewer.destroy
    
    respond_to do |format|
      format.js
    end
  end
  
  #
  # GET /messages
  #
  def index
    @messages = Message.find_all_by_game_id(nil)

    respond_to do |format|
      format.html # index.html.erb
    end
  end

  #
  # GET /messages/1
  #
  def show
    @message = Message.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
    end
  end

  #
  # GET /messages/new
  #
  def new
    @message = Message.new

    respond_to do |format|
      format.html # new.html.erb
    end
  end

  #
  # GET /messages/1/edit
  #
  def edit
    @message = Message.find(params[:id])
  end

  #
  # POST /messages
  #
  def create
    if current_player.admin && params[:message][:game_id].nil?
      @message = Message.new(params[:message])
    else
      @message = Message.new(params[:message])
      @message.game = current_player.games.find(params[:message][:game_id])
    end
    
    @message.player = current_player

    respond_to do |format|
      if @message.save
        format.js
        format.html { redirect_to(messages_url, :notice => 'Message was successfully created.') }
      else
        format.js { render :json => false }
        format.html { render :action => "new" }
      end
    end
  rescue ActiveRecord::RecordNotFound
    respond_to do |format|
      format.js { render :json => false }
    end
  end

  #
  # PUT /messages/1
  #
  def update
    @message = Message.find(params[:id])

    respond_to do |format|
      if @message.update_attributes(params[:message])
        format.html { redirect_to(messages_url, :notice => 'Message was successfully updated.') }
      else
        format.html { render :action => "edit" }
      end
    end
  end

  #
  # DELETE /messages/1
  #
  def destroy
    @message = Message.find(params[:id])
    @message.destroy

    respond_to do |format|
      format.html { redirect_to(messages_url) }
    end
  end
end
