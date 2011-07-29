module TileTypesHelper
  def display_tile_img(tile_type)
    "<div style=\"background: url(#{tile_type.img}) no-repeat scroll #{tile_type.img_x}px #{tile_type.img_y*-1}px transparent; width:72px; height:72px;\"></div>"
  end
end
