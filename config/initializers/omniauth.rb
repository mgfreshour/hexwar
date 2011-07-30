

Rails.application.config.middleware.use OmniAuth::Builder do 
  # TODO - fix this to work on windows. 
  if false
    provider :facebook, Facebook::APP_ID.to_s, Facebook::SECRET.to_s , :scope => 'publish_stream', :client_options => {:ssl => {:ca_path => "/etc/ssl/certs"}}
  else
    provider :facebook, Facebook::APP_ID.to_s, Facebook::SECRET.to_s , :scope => 'publish_stream', :client_options => {:ssl => {:verify => false}}
  end
end
