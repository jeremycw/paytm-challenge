require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test "should create session given correct password" do
    post session_url, params: { session: { email: "test@example.com", password: "password"  } }, as: :json

    assert_response 201
  end

  test "should not create session given incorrect password" do
    post session_url, params: { session: { email: "test@example.com", password: "incorrect"  } }, as: :json

    assert_response 401
  end
end
