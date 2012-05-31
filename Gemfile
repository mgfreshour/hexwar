source 'http://rubygems.org'

gem 'rails', '3.1.3'

# Bundle edge Rails instead:
# gem 'rails', :git => 'git://github.com/rails/rails.git'

# To use debugger
# gem 'ruby-debug'

# Bundle the extra gems:
gem 'omniauth', '1.0.1'
gem 'rack-p3p'
gem 'acts_as_list'
gem 'koala', '1.3.0'
# gem 'jammit'
# gem 'closure-compiler'
gem 'rake', '~>0.9.2'
gem 'whenever'

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  # gem 'sass-rails', "  ~> 3.1.0"
  # gem 'coffee-rails', "~> 3.1.0"
  gem 'uglifier'
end

#gem 'jquery-rails'

# Bundle gems for the local environment. Make sure to
# put test-only gems in this group so their generators
# and rake tasks are available in development mode:
group :production do
  gem 'ruby-mysql'
  gem 'mysql2'
end
group :development, :test do
  gem 'sqlite3-ruby', :require => 'sqlite3'
	gem 'simplecov'
	gem 'rspec-rails'
	gem 'spork'
	gem 'factory_girl_rails'
	gem 'capybara'
	gem 'win32-open3-19', :platforms => [:mswin, :mingw]
	gem 'win32console', :platforms => [:mswin, :mingw]
	
	gem "bullet"
	gem "ruby-growl"

	# Deploy with Capistrano
	gem 'capistrano'
end

