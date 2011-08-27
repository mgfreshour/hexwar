require 'spec_helper'

describe Game do  
  context "when game exists without a turn" do
    before(:each) do
      @game = Factory(:game)
      @turn_data = {:current_unit_data=>'test', :current_tile_owner_data=>'test2',:resource_data=>'test3'}
    end

    it "should create a new turn correctly" do
      @game.create_new_turn('red', @turn_data)
      @game.game_turns.length.should == 1
      @game.current_turn.start_unit_data.should == @turn_data[:current_unit_data]
      @game.current_turn.current_unit_data.should == @turn_data[:current_unit_data]
      @game.current_turn.resource_data.should == @turn_data[:resource_data]
      @game.current_turn.current_tile_owner_data.should == @turn_data[:current_tile_owner_data]
      @game.current_turn.end_unit_data.should be_nil
      @game.current_turn.team.should == 'red'
      @game.current_turn.round_number.should == 1
    end

    it "should increment round number with each turn created" do
      @game.create_new_turn('red', @turn_data)
      @game.current_turn.round_number.should == 1
      @game.create_new_turn('green', @turn_data)
      @game.current_turn.round_number.should == 2
      @game.create_new_turn('blue', @turn_data)
      @game.current_turn.round_number.should == 3
    end
    
  end
  
  context "when game is on red's turn with two players" do
    before(:each) do
      @game = Factory(:game)
      @red_player = Factory(:game_player, :team=>'red')
      @green_player = Factory(:game_player, :team=>'green')
      @game.game_players << @red_player
      @game.game_players << @green_player
      @turn_data = {:current_unit_data=>'test', :current_tile_owner_data=>'test2',:resource_data=>'test3'}
      @game.create_new_turn('red', @turn_data)  
    end
    
    it "should throw an exception when wrong player tries to end turn" do
      expect { @game.end_turn(@green_player.player, @turn_data) }.to raise_error('Trying to end turn with incorrect current_player!')
    end

    it "should create a new turn after ending current turn" do
      prev_turn = @game.current_turn
      @game.end_turn(@red_player.player, @turn_data)
      @game.current_turn.should_not == prev_turn
    end

    it "should transition to next players turn on end turn" do
      @game.end_turn(@red_player.player, @turn_data)
      @game.current_turn.team.should == 'green'
    end

    it "should create a notification for the next players turn" do
      @game.end_turn(@red_player.player, @turn_data)
      @green_player.player.turn_notifications.length.should == 1
      @green_player.player.turn_notifications.first.game_id.should == @game.id
    end

    it "should clear player notifications" do
      @turn_notification = Factory(:turn_notification, :player=>@red_player.player, :game=>@game)

      @game.clear_notifications(@red_player.player)
      @red_player.player.turn_notifications.length.should == 0
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

