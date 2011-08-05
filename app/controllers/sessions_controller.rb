class SessionsController < ApplicationController
  skip_filter :check_authentication
  skip_filter :check_admin
  
  def create    
    auth = request.env["omniauth.auth"]
    
    
    #@facebook_rest = Koala::Facebook::RestAPI.new(auth['credentials']['token'])
    #arguments_hash = { :message => 'Hello World From HexWars!' }
    #@facebook_rest.rest_call("email")
    
    @faceboook_graph = Koala::Facebook::GraphAPI.new(auth['credentials']['token'])
    profile = @faceboook_graph.get_object("me")
    
    player = Player.find_by_provider_and_uid(auth["provider"], auth["uid"]) || Player.create_with_omniauth(auth)
    

    if player.email.nil?
      player.email = profile['email']
      player.save
    end
    
    session[:player_id] = player.id  
    if player.notify_by_email.nil?
      redirect_to edit_player_path(player)
    else
      redirect_to root_url
    end
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
