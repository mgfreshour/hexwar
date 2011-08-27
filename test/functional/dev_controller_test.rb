require 'test_helper'

class DevControllerTest < ActionController::TestCase
  test "should get qunit" do
    get :qunit
    assert_response :success
  end

end
