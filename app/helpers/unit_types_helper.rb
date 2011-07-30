module UnitTypesHelper
  def load_js_unit_types
    @tile_types = TileType.find(:all, :order => :position)
    unit_types = UnitType.find(:all, :order => :position)
    out = 'var unit_types = ['
    n = 0;
    unit_types.each do |unit|
      out += ', ' unless n == 0
      out += "new UnitType('#{unit.name}','#{unit.img}', #{unit.img_x}, #{unit.img_y}, #{unit.attack_range}, #{unit.move_range},"
      out += "{"
      @tile_types.each do |tile|
        out += ',' unless tile.position == 1
        out += tile.name+':'+unit.send('move_cost_'+tile.name).to_json
      end
      out += "},"
      out += "{"
      @tile_types.each do |tile|
        out += ',' unless tile.position == 1
        out += tile.name+':'+unit.send('defense_bonus_'+tile.name).to_json
      end
      out += "})"
      n += 1
    end
    out += '];'
    out
  end
  
  def display_unit_img(unit_type)
    "<div style=\"background: url(#{unit_type.img}) no-repeat scroll #{unit_type.img_x}px #{unit_type.img_y*-1}px transparent; width:72px; height:72px;\"></div>"
  end
end
