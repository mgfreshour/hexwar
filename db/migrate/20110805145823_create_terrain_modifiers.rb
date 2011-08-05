class CreateTerrainModifiers < ActiveRecord::Migration
  def self.up
    create_table :terrain_modifiers do |t|
      t.integer :unit_type_id
      t.integer :tile_type_id
      t.integer :defense_bonus
      t.integer :movement_cost
      t.string :tile_type_name

      t.timestamps
    end
    
    # Copy the data from unit_types to new table
    unit_types = UnitType.find(:all)
    tile_types = TileType.find(:all)
    unit_types.each do |unit_type|
      tile_types.each do |tile_type|
        TerrainModifier.create( :unit_type=>unit_type, :tile_type=>tile_type, :tile_type_name=>tile_type.name,
                                :movement_cost=>unit_type.send('move_cost_'+tile_type.name), 
                                :defense_bonus=>unit_type.send('defense_bonus_'+tile_type.name) )
      end
    end
    
    # Remove the old columns
    tile_types.each do |tile_type|
      remove_column :unit_types, 'move_cost_'+tile_type.name
      remove_column :unit_types, 'defense_bonus_'+tile_type.name
    end
  end

  def self.down
    unit_types = UnitType.find(:all)
    tile_types = TileType.find(:all)
    
    # Add back the old columns
    tile_types.each do |tile_type|
      add_column :unit_types, 'move_cost_'+tile_type.name, :integer
      add_column :unit_types, 'defense_bonus_'+tile_type.name, :integer
    end
    
    # Copy back the data
    unit_types.each do |unit_type|
      terrain_modifiers = TerrainModifier.find(:all)
      terrain_modifiers.each do |terr_mod|
        unit_type.send('move_cost_'+terr_mod.tile_type_name+'=', terr_mod.movement_cost)
        unit_type.send('defense_bonus_'+terr_mod.tile_type_name+'=', terr_mod.defense_bonus)
      end
      
      unit_type.save
    end
    
    drop_table :terrain_modifiers
  end
end
