

Rails.application.config.middleware.use OmniAuth::Builder do  
  provider :facebook, Facebook::APP_ID.to_s, Facebook::SECRET.to_s , :scope => 'publish_stream'
end
