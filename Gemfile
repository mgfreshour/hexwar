source 'http://rubygems.org'

gem 'rails', '3.0.9'

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
gem 'rack-p3p'
gem 'acts_as_list'
gem 'koala', '~>1.1.0'
gem 'jammit'
gem 'closure-compiler'
gem 'win32-open3-19', :platforms => [:mswin, :mingw]
gem 'win32console', :platforms => [:mswin, :mingw]
gem 'rake', '~>0.9.2'
gem 'whenever'

# Bundle gems for the local environment. Make sure to
# put test-only gems in this group so their generators
# and rake tasks are available in development mode:
group :production do
  gem 'ruby-mysql'
end
group :development, :test do
  gem 'sqlite3-ruby', :require => 'sqlite3'

	gem 'rspec-rails'
	gem 'spork', '~> 0.9.0.rc'
  gem 'factory_girl_rails'
  gem 'capybara'
end

