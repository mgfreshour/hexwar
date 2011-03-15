require 'test_helper'

class TurnActionsControllerTest < ActionController::TestCase
  setup do
    @turn_action = turn_actions(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:turn_actions)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create turn_action" do
    assert_difference('TurnAction.count') do
      post :create, :turn_action => @turn_action.attributes
    end

    assert_redirected_to turn_action_path(assigns(:turn_action))
  end

  test "should show turn_action" do
    get :show, :id => @turn_action.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @turn_action.to_param
    assert_response :success
  end

  test "should update turn_action" do
    put :update, :id => @turn_action.to_param, :turn_action => @turn_action.attributes
    assert_redirected_to turn_action_path(assigns(:turn_action))
  end

  test "should destroy turn_action" do
    assert_difference('TurnAction.count', -1) do
      delete :destroy, :id => @turn_action.to_param
    end

    assert_redirected_to turn_actions_path
  end
end
