# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)

require 'active_record/fixtures'

puts "Loading regular seeds"
Dir[Rails.root.join("db/seeds", "*.{yml,csv}")].each do |file|
  Fixtures.create_fixtures("db/seeds", File.basename(file, '.*'))
end

puts "Loading #{Rails.env} seeds"
Dir[Rails.root.join("db/seeds", Rails.env, "*.{yml,csv}")].each do |file|
  Fixtures.create_fixtures("db/seeds/#{Rails.env}", File.basename(file, '.*'))
end
