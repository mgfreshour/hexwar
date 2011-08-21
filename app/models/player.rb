class Player < ActiveRecord::Base
  has_many :game_players, :dependent => :destroy
  has_many :games, :through => :game_players
  has_many :message_viewers, :dependent => :destroy
  has_many :messages, :through => :message_viewers
  has_many :turn_notifications
  validates :name, :presence=>true
  validates :uid, :presence=>true
  validates :provider, :presence=>true
  
  def self.create_with_omniauth(provider, user_id, name)      
    create! do |user|  
      user.provider = provider
      user.uid = user_id 
      user.name = name
    end
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

