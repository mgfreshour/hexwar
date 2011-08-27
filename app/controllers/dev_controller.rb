class DevController < ApplicationController
  skip_filter :check_authentication, :except => [:check_authentication]
  skip_filter :check_admin
  skip_filter :need_to_update_profile
  before_filter :check_is_dev
  
  private 
  def check_is_dev
    redirect_to root_url unless Rails.env == 'development' || Rails.env == 'test'
  end
  
  def qunit
  end

end
