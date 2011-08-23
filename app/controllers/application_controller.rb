class ApplicationController < ActionController::Base
  protect_from_forgery
  
  before_filter :check_authentication, :except => [:check_authentication]
  before_filter :check_admin
  before_filter :need_to_update_profile
  before_filter :create_facebook_access
  
  def oauth
    @oauth ||= Koala::Facebook::OAuth.new
  end
  
  private   
  def check_authentication
    if session[:expires].nil? || session[:last_seen].nil? || (session[:expires] < Time.now && session[:last_seen] < Time.now - 30.minutes)
      session[:player_id] = nil
    end

    @current_player ||= Player.find(session[:player_id]) if session[:player_id] 
    session[:last_seen] = Time.now

    session[:signed_request] = params[:signed_request]
    redirect_to '/sessions/new' unless @current_player
  end
  
  def need_to_update_profile
    return unless @current_player
    
    if @current_player.notify_by_email.nil? || @current_player.available_for_random.nil?
      flash[:notice] = "Please update your profile as there have been additions"
      redirect_to edit_player_path(@current_player)
    end
  end
  
  def create_facebook_access
    return unless @current_player
  
  	begin
        @facebook_rest = Koala::Facebook::RestAPI.new(@current_player.token)
        #arguments_hash = { :message => 'Hello World From HexWars!' }
        #@facebook_rest.rest_call("email")
    
        @faceboook_graph = Koala::Facebook::GraphAPI.new(@current_player.token)
        profile = @faceboook_graph.get_object("me")
  	rescue Koala::Facebook::APIError => e
  	  # It appears we have a bad token, send them to get a new one
  	  redirect_to '/sessions/new'
  	end
    
    save = false;

    if @current_player.real_name.nil?
      @current_player.real_name = @current_player.name
      save = true
    end

    if @current_player.email.nil?
      @current_player.email = profile['email']
      save = true
    end

    @current_player.save if save
  end
  
  def check_admin
    redirect_to root_path unless @current_player.admin
  end
end
