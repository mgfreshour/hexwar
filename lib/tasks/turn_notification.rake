namespace :game do
  task :turn_notification => :environment do
    puts TurnNotification.notify_by_email
  end
end