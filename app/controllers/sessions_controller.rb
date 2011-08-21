class SessionsController < ApplicationController
  skip_filter :check_authentication
  skip_filter :check_admin
  
  def create    
    auth = request.env["omniauth.auth"]
    
    @faceboook_graph = Koala::Facebook::GraphAPI.new(auth['credentials']['token'])
    
    player = Player.find_by_provider_and_uid(auth["provider"], auth["uid"]) || Player.create_with_omniauth(auth)

    if player.token != auth['credentials']['token']
      player.token = auth['credentials']['token']
      player.save
    end
    
    session[:player_id] = player.id
    session[:expires] = Time.now + 1.day

    redirect_to root_url
  end
  
  def failure
    respond_to do |format|
      format.html { render :text=>"Unable to log you in - #{params[:message]}"}
    end
  end
  
  def destroy  
    session[:player_id] = nil  
    respond_to do |format|
      format.html
    end 
  end
end
