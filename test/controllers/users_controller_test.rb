require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    @auth_token = JWT.encode({user_id: @user.id}, nil, 'none')
  end

  test "should create user" do
    assert_difference('User.count') do
      post users_url, params: { user: { email: "test@example.com", password: "password" } }, as: :json
    end

    assert_response 201
  end
end
