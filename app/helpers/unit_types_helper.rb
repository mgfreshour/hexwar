module UnitTypesHelper
  def display_unit_img(unit_type)
    "<div style=\"background: url(#{unit_type.img}) no-repeat scroll #{unit_type.img_x}px #{unit_type.img_y*-1}px transparent; width:72px; height:72px;\"></div>"
  end
end
