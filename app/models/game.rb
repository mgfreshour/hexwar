class Game < ActiveRecord::Base
  belongs_to :map
  has_many :game_turns, :dependent => :destroy
  has_many :game_players, :dependent => :destroy
  accepts_nested_attributes_for :game_players, :reject_if => proc { |attributes| attributes[:player_id].blank? }
  has_many :players, :through => :game_players
  has_many :messages
  has_many :turn_notifications
  validates :name, :presence=>true
  validates :map, :presence=>true, :associated=>true
  
  def is_players_turn(player)
    # TODO - I've got the player, I should just lookup based on that
    self.game_players.each do |game_player|
      if game_player.player == player && game_player.team == self.current_turn.team
        return true
      end
    end

    return false
  end
  
  def current_turn
    @current_turn ||= self.game_turns.find(:all, :order => "round_number DESC", :limit => 1).first
  end
  
  def create_new_turn(team, turn_data)
    round_number = @current_turn ? @current_turn.round_number+1 : 1
    turn_data = turn_data.merge({:game=>self, :team=>team, :round_number=>round_number})
    @current_turn = GameTurn.new(turn_data)
    @current_turn.save
  end
  
  def save_current_turn(turn_data)
    current_turn.current_unit_data = turn_data[:current_unit_data]
    current_turn.end_unit_data = turn_data[:current_unit_data]
    current_turn.resource_data = turn_data[:resource_data]
    current_turn.save
  end
  
  def get_next_game_player
    # Nope, stil going. Who plays next?
    current_player_found = false
    next_player = nil
    self.game_players.each do |game_player|
      if current_player_found
        next_player = game_player
        break
      end  
      current_player_found = true if is_players_turn(game_player.player)
    end
  
    # was it the last one?
    next_player = self.game_players.first if next_player.nil?
    
    return next_player
  end
  
  def end_turn(current_player, turn_data)
    # make sure it's their turn to end
    raise 'Trying to end turn with incorrect current_player!' unless is_players_turn(current_player)

    save_current_turn(turn_data)
    
    next_player = get_next_game_player

    create_new_turn(next_player.team, turn_data)
    
    create_notifications(next_player)
  end
  
  def create_notifications(next_player)    
    turn_notification = TurnNotification.new({:player=>next_player.player, :game=>self})
    unless turn_notification.save
      raise 'Failed to create turn notification!'
    end
  end
  
  def clear_notifications(current_player)
    if is_players_turn(current_player)
      tn = current_player.turn_notifications.find_by_game_id(self.id)
      tn.destroy unless tn.nil?
    end
  end
end




# == Schema Information
#
# Table name: games
#
#  id          :integer         not null, primary key
#  map_id      :integer
#  name        :string(255)
#  created_at  :datetime
#  updated_at  :datetime
#  game_winner :string(255)
#

