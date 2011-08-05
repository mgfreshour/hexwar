class AddIndicesToTables < ActiveRecord::Migration
  def self.up
    add_index :game_players, :game_id, :name=>'game_id_idx'
    add_index :game_players, :player_id, :name=>'player_id_idx'
    
    add_index :game_turns, [:game_id, :created_at], :name=>'game_order_id_idx'
    
    add_index :players, [:provider, :uid], :name=>'provider_uid_idx'
    
    add_index :terrain_modifiers, :unit_type_id, :name=>'unit_type_idx'
  end

  def self.down
    remove_index :game_players, :name=>'game_id_idx'
    remove_index :game_players, :name=>'player_id_idx'
    
    remove_index :game_turns, :name=>'game_order_id_idx'
    
    remove_index :players, :name=>'provider_uid_idx'
    
    remove_index :terrain_modifiers, :name=>'unit_type_idx'
  end
end
