class SessionsController < ApplicationController
  skip_filter :check_authentication
  skip_filter :check_admin
  
  def create    
    auth = request.env["omniauth.auth"]  
    #@rest = Koala::Facebook::RestAPI.new(auth['credentials']['token'])
    #arguments_hash = { :message => 'Hello World From HexWars!' }
    #@rest.rest_call("stream.publish", arguments_hash)
    player = Player.find_by_provider_and_uid(auth["provider"], auth["uid"]) || Player.create_with_omniauth(auth)
    session[:player_id] = player.id  
    redirect_to root_url
  end
  
  def destroy  
    session[:player_id] = nil  
    respond_to do |format|
      format.html
    end 
  end
end
