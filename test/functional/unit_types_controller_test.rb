require 'test_helper'

class UnitTypesControllerTest < ActionController::TestCase
  setup do
    @unit_type = unit_types(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:unit_types)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create unit_type" do
    assert_difference('UnitType.count') do
      post :create, :unit_type => @unit_type.attributes
    end

    assert_redirected_to unit_type_path(assigns(:unit_type))
  end

  test "should show unit_type" do
    get :show, :id => @unit_type.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @unit_type.to_param
    assert_response :success
  end

  test "should update unit_type" do
    put :update, :id => @unit_type.to_param, :unit_type => @unit_type.attributes
    assert_redirected_to unit_type_path(assigns(:unit_type))
  end

  test "should destroy unit_type" do
    assert_difference('UnitType.count', -1) do
      delete :destroy, :id => @unit_type.to_param
    end

    assert_redirected_to unit_types_path
  end
end
