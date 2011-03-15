module TileTypesHelper
  def load_js_tile_types
    unit_types = TileType.find(:all, :order => :position)
    out = 'var tile_types = ['
    n = 0;
    unit_types.each do |tile|
      out += ', ' unless n == 0
  		out += "new TileType('#{tile.name}','#{tile.img}', #{tile.img_x}, #{tile.img_y})"
  		n += 1
  	end
  	out += '];'
  	out
  end
  
  def display_tile_img(tile_type)
    "<div style=\"background: url(#{tile_type.img}) no-repeat scroll #{tile_type.img_x}px #{tile_type.img_y*-1}px transparent; width:72px; height:72px;\"></div>"
  end
end
