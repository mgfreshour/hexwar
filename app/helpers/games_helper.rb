module GamesHelper
  def load_js_turn_units(turn, variable_name)
    #raise turn.first.current_unit_data.to_yaml
    #return if map.nil?
  	out = "\n\n/* Current - #{turn.player} - turn #{turn.id}  */\n\n"
  	out +=  "#{variable_name}.unit_data = [];"
    turn.current_unit_data.each do |key, unit|
      health = unit[:health] ? unit[:health] : 0  
      out += "#{variable_name}.unit_data[#{key}] = unit_types[#{unit[:type_index]}].createUnit('#{unit[:team]}', #{unit[:x]}, #{unit[:y]}, #{health});"
      acted = unit[:team] == turn.player ? 'false' : 'true'
      out += "#{variable_name}.unit_data[#{key}].acted = #{acted};"
    end
    
    out
  end
end
