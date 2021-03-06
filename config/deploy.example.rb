default_run_options[:pty] = true 

set :application, ""
set :domain, ""
set :deploy_to,  ""
set :port, 22
set :use_sudo, false

set :deploy_via, :remote_cache
set :scm, :git
set :branch, 'master'
set :scm_verbose, true
set :repository, "#{domain}:.git_repos/#{application}"
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

role :web, domain                         # Your HTTP server, Apache/etc
role :app, domain                          # This may be the same as your `Web` server
role :db,  domain, :primary => true # This is where Rails migrations will run
#role :db,  "your slave db-server here"

# If you are using Passenger mod_rails uncomment this:
# if you're still using the script/reapear helper you will need
# these http://github.com/rails/irs_process_scripts

namespace :deploy do
  task :start do ; end
  task :stop do ; end
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
  end
end

# in RAILS_ROOT/config/deploy.rb:


after 'deploy:update_code', 'deploy:symlink_db'
namespace :deploy do
  desc "Symlinks the database.yml"
  task :symlink_db, :roles => :app do
    run "ln -nfs #{deploy_to}/shared/config/database.yml #{release_path}/config/database.yml"
  end
end

after 'deploy:update_code', 'deploy:symlink_config'
namespace :deploy do
  desc "Symlinks the config.yml"
  task :symlink_facebook, :roles => :app do
    run "ln -nfs #{deploy_to}/shared/config/config.yml #{release_path}/config/config.yml"
  end
end

after 'deploy:update_code', 'deploy:symlink_capistrano'
namespace :deploy do
  desc "Symlinks the capistrano directory"
  task :symlink_capistrano, :roles => :app do
    run "ln -nfs #{deploy_to}/shared/capistrano #{release_path}/config/capistrano"
  end
end


after 'deploy:update_code', 'bundler:bundle_new_release'
namespace :bundler do
  task :create_symlink, :roles => :app do
    shared_dir = File.join(shared_path, 'bundle')
    release_dir = File.join(current_release, '.bundle')
    run("mkdir -p #{shared_dir} && ln -s #{shared_dir} #{release_dir}")
  end
 
  task :bundle_new_release, :roles => :app do
    bundler.create_symlink
    run "cd #{release_path} && bundle install --without test"
  end
end
 

after 'deploy:symlink', 'deploy:precache_assets'
namespace :deploy do
  desc 'Bundle and minify the JS and CSS files'
  task :precache_assets, :roles => :app do
    root_path = File.expand_path(File.dirname(__FILE__) + '/..')
    assets_path = "#{root_path}/public/assets"
    gem_path = ENV['GEM_PATH']
    run_locally "jammit"
    top.upload assets_path, "#{current_release}/public", :via => :scp, :recursive => true
  end
end

set :whenever_command, "bundle exec whenever"
require "whenever/capistrano"
