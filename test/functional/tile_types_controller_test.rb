require 'test_helper'

class TileTypesControllerTest < ActionController::TestCase
  setup do
    @tile_type = tile_types(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:tile_types)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create tile_type" do
    assert_difference('TileType.count') do
      post :create, :tile_type => @tile_type.attributes
    end

    assert_redirected_to tile_type_path(assigns(:tile_type))
  end

  test "should show tile_type" do
    get :show, :id => @tile_type.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @tile_type.to_param
    assert_response :success
  end

  test "should update tile_type" do
    put :update, :id => @tile_type.to_param, :tile_type => @tile_type.attributes
    assert_redirected_to tile_type_path(assigns(:tile_type))
  end

  test "should destroy tile_type" do
    assert_difference('TileType.count', -1) do
      delete :destroy, :id => @tile_type.to_param
    end

    assert_redirected_to tile_types_path
  end
end
