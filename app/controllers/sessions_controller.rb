class SessionsController < ApplicationController
  skip_filter :check_authentication
  skip_filter :check_admin
  
  private
  def fb_login_user(token, user_id)
    faceboook_graph = Koala::Facebook::GraphAPI.new(token)
    profile = faceboook_graph.get_object("me")
    
    player = Player.find_by_provider_and_uid('facebook', user_id) || Player.create_with_omniauth('facebook', user_id, profile[:name])

    if player.token != token
      player.token = token
      player.save
    end

    session[:player_id] = player.id
    session[:expires] = Time.now + 1.day

    redirect_to root_url
  end
  
  def new
    from_cookies = oauth.get_user_info_from_cookies(cookies)
    if from_cookies && from_cookies['access_token'] && from_cookies['uid']
      return fb_login_user(from_cookies['access_token'], from_cookies['uid'])
    end

    if session[:signed_request]
      auth = oauth.parse_signed_request(session[:signed_request])
      logger.debug auth.to_s
      if auth['user_id'] && auth[:oauth_token]
        return self.fb_login_user(auth[:oauth_token], from_cookie[:user_id])
      end
    end

    #redirect_to '/auth/facebook' unless @current_player
    respond_to do |format|
      format.html
    end
  end
  
  def create    
    auth = request.env["omniauth.auth"]
    
    @faceboook_graph = Koala::Facebook::GraphAPI.new(auth['credentials']['token'])
    
    player = Player.find_by_provider_and_uid(auth["provider"], auth["uid"]) || Player.create_with_omniauth(auth["provider"], auth["uid"], auth["user_info"]["name"])

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
