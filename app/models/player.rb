class Player < ActiveRecord::Base
  has_many :game_players, :dependent => :destroy
  has_many :games, :through => :game_players
  has_many :message_viewers, :dependent => :destroy
  has_many :messages, :through => :message_viewers
  has_many :turn_notifications
  validates :name, :presence=>true
  validates :uid, :presence=>true
  validates :provider, :presence=>true
  
  def self.create_with_omniauth(provider, user_id, token)
    faceboook_graph = Koala::Facebook::GraphAPI.new(token)
    profile = faceboook_graph.get_object("me")

    create! do |user|  
      user.provider = provider
      user.uid = user_id 
      user.token = token
      user.name = profile['name']
      user.email = profile['email']
      user.real_name = profile['name']
    end
    
  end
  
  # def update_from_facebook
  #   profile = faceboook_graph.get_object("me")
  # end
  
  def facebook_graph
    @faceboook_graph ||= Koala::Facebook::GraphAPI.new(self.token)
  end
  
  def facebook_rest
    @facebook_rest ||= Koala::Facebook::RestAPI.new(self.token)
  end
  
  def update_attributes(params)
    profile = self.facebook_graph.get_object("me")
    @name = profile['name']
    @email = profile['email']
    @real_name = profile['real_name']
    super(params)
  end
  
  def get_friends
    friend_list = facebook_rest.rest_call('friends_getAppUsers');
    Player.find(:all, :conditions => ["id <> #{self.id} AND uid IN (?)", friend_list])
  end
  
  def get_random_opponent(exclude_list=[])
    exclude_list << self.id
    players = Player.find(:all, :conditions => ["id NOT IN (?)", exclude_list])
    available_for_random = []
    players.each do |player|
      if player.available_for_random
        available_for_random << player
      end
    end

    available_for_random[rand(available_for_random.length)]
  end
end





# == Schema Information
#
# Table name: players
#
#  id                   :integer         not null, primary key
#  name                 :string(255)
#  created_at           :datetime
#  updated_at           :datetime
#  uid                  :string(255)
#  provider             :string(255)
#  admin                :boolean
#  email                :string(255)
#  notify_by_email      :boolean
#  real_name            :string(255)
#  available_for_random :boolean
#  token                :string(255)
#

