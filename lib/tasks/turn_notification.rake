namespace :game do
  task :turn_notification => :environment do
    TurnNotification.notify_by_email
  end
end