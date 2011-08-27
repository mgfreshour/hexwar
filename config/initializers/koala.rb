# config/initializers/koala.rb
# Monkey-patch in Facebook config so Koala knows to 
# automatically use Facebook settings from here if none are given

Koala::Facebook::OAuth.class_eval do
  def initialize_with_default_settings(*args)
    case args.size
      when 0, 1
        raise "application id and/or secret are not specified in the config" unless HexGame::Application.config.hexwar['facebook']['app_id'] && HexGame::Application.config.hexwar['facebook']['secret']
        initialize_without_default_settings(HexGame::Application.config.hexwar['facebook']['app_id'], HexGame::Application.config.hexwar['facebook']['secret'], args.first)
      when 2, 3
        initialize_without_default_settings(*args) 
    end
  end 

  alias_method_chain :initialize, :default_settings 
end

