module MapsHelper
  def load_js_map(map, variable_name)
    #return if map.nil?
  	out =  "#{variable_name} = new Hexwar.Map(#{map.height}, #{map.width}, '#{map.name}', #{map.id});
          	var row = null;"

  	map.tile_data.each do |key, row|
  		out += "row = [];"
  		row.each do |col_key, col|
  			out += "row[#{col_key}] = tile_types[#{col[:type_index]}].createTile();"
  		end
  	out += "#{variable_name}.tile_data.data[#{key}] = row;"
  	end
  	
  	out
  end

  def load_js_map_units(map, variable_name)
    #return if map.nil?
  	out =  "#{variable_name}.unit_data = [];"
  	
    map.unit_data.each do |key, unit|
      out += "#{variable_name}.unit_data[#{key}] = unit_types[#{unit[:type_index]}].createUnit('#{unit[:team]}', #{unit[:x]}, #{unit[:y]});"
    end
    
    out
  end
end
