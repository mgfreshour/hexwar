class ApplicationController < ActionController::Base
  protect_from_forgery
  
  before_filter :check_authentication, :except => [:check_authentication]
  before_filter :check_admin
  
  private   
  def check_authentication
    @current_player ||= Player.find(session[:player_id]) if session[:player_id] 

    redirect_to '/auth/facebook' unless @current_player
  end
  
  def check_admin
    redirect_to root_path unless @current_player.admin
  end
end
