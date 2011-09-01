
Factory.define :game do |f|
  f.name 'Test Game'
  f.association :map
  #f.game_players {|game_player| [game_player.association(:game_player)]}
end

Factory.define :game_player do |f|
  f.association :player
  f.association :game
end

Factory.define :game_turn do |f|
  f.association :game
end

Factory.define :map do |f|
  f.name 'Test Map'
  f.height 10
  f.width 10
  f.number_of_players 2
  f.unit_data ['test','me']
end

Factory.define :message do |f|
  f.text 'Test Text'
  f.association :player
end

Factory.define :message_viewer do |f|
  f.association :message
  f.association :player
end

Factory.define :player do |f|
  f.name 'John Bon'
  f.provider 'facebook'
  f.sequence(:uid) { |n| "UID_#{n}" }
  f.sequence(:email) { |n| "email#{n}@example.com" }
  f.notify_by_email true
end

Factory.define :terrain_modifier do |f|

end

Factory.define :tile_type do |f|
  f.name 'test tile'
  f.img 'my.png'
end

Factory.define :turn_notification do |f|
  f.association :player
  f.association :game
end

Factory.define :unit_type do |f|
  f.name 'test unit'
  f.img 'my.png'
end