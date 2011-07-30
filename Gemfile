source 'http://rubygems.org'

gem 'rails', '3.0.7'

# Bundle edge Rails instead:
# gem 'rails', :git => 'git://github.com/rails/rails.git'

# Use unicorn as the web server
# gem 'unicorn'

# Deploy with Capistrano
gem 'capistrano'

# To use debugger
# gem 'ruby-debug'

# Bundle the extra gems:
gem 'omniauth'
gem 'acts_as_list'
gem 'koala', "~>1.0.0"
gem 'jammit'
gem 'win32-open3-19', :platforms => [:mswin, :mingw]
gem 'win32console', :platforms => [:mswin, :mingw]

# Bundle gems for the local environment. Make sure to
# put test-only gems in this group so their generators
# and rake tasks are available in development mode:
group :production do
  gem 'ruby-mysql'
end
group :development, :test do
  gem 'sqlite3-ruby', :require => 'sqlite3'
end
