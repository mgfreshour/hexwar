class ApplicationController < ActionController::Base
  protect_from_forgery
  
  before_filter :check_authentication, :except => [:check_authentication]
  before_filter :check_admin
  before_filter :need_to_update_profile
  
  private   
  def check_authentication
    @current_player ||= Player.find(session[:player_id]) if session[:player_id] 

    redirect_to '/auth/facebook' unless @current_player
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
