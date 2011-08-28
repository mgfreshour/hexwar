class ApplicationController < ActionController::Base
  protect_from_forgery
  
  before_filter :check_authentication, :except => [:check_authentication]
  before_filter :check_admin
  before_filter :need_to_update_profile
  
  rescue_from Koala::Facebook::APIError, :with=>:redirect_to_login
  
  private #####################################################################
  
  def redirect_to_login
    # It appears we have a bad token, send them to get a new one
	  redirect_to '/sessions/new'
  end

  def oauth
    @oauth ||= Koala::Facebook::OAuth.new
  end
  
  def current_player
    return @current_player
  end
 
  def check_authentication
    if session[:expires].nil? || session[:last_seen].nil? || (session[:expires] < Time.now && session[:last_seen] < Time.now - 30.minutes)
      session[:player_id] = nil
    end

    @current_player ||= Player.find(session[:player_id]) if session[:player_id] 
    session[:last_seen] = Time.now

    session[:signed_request] = params[:signed_request]
    redirect_to_login unless @current_player
  end
  
  def need_to_update_profile
    return unless @current_player
    
    if @current_player.notify_by_email.nil? || @current_player.available_for_random.nil?
      flash[:notice] = "Please update your profile as there have been additions"
      redirect_to edit_player_path(@current_player)
    end
  end
  
  def check_admin
    redirect_to root_path unless @current_player.admin
  end
end
