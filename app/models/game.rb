class Game < ActiveRecord::Base
  belongs_to :map
  has_many :game_turns, :dependent => :destroy
  has_many :game_players, :dependent => :destroy
  accepts_nested_attributes_for :game_players, :reject_if => proc { |attributes| attributes[:player_id].blank? }
  has_many :players, :through => :game_players
  validates :name, :presence=>true
  validates :map, :presence=>true, :associated=>true
  
  def current_turn
    @current_turn ||= game_turns.find(:all, :order => "created_at DESC", :limit => 1).first
  end
  
  def create_new_turn(team, unit_data)
    game_turn = GameTurn.new()
    game_turn.game = self
    game_turn.start_unit_data = unit_data
    game_turn.current_unit_data = unit_data
    game_turn.player = team
    game_turn.save
  end
  
  def end_turn(unit_data)
    current_turn.current_unit_data = unit_data
    current_turn.end_unit_data = unit_data
    current_turn.save
    
    # Who plays next?
    player_order = { 'red' => 'green', 'green' => 'red' } if map.number_of_players == 2
    player_order = { 'red' => 'green', 'green' => 'blue', 'blue' => 'red' } if map.number_of_players == 3
    player_order = { 'red' => 'green', 'green' => 'blue', 'blue' => 'white', 'white' => 'red' } if map.number_of_players == 4
    create_new_turn(player_order[current_turn.player], current_turn.current_unit_data)
  end
end



# == Schema Information
#
# Table name: games
#
#  id         :integer         not null, primary key
#  map_id     :integer
#  name       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

