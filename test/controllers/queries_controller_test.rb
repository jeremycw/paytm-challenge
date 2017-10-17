require 'test_helper'

class QueriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @query = queries(:one)
    @user = users(:one)
    @auth_token = JWT.encode({user_id: @user.id}, nil, 'none')
  end

  test "should get index" do
    get queries_url, as: :json, headers: { "HTTP_AUTHENTICATION" => "Bearer #{@auth_token}" }

    assert_response :success
  end

  test "should create query" do
    assert_difference('Query.count') do
      post queries_url, params: { q: "test" }, as: :json, headers: { "HTTP_AUTHENTICATION" => "Bearer #{@auth_token}" }

    end

    assert_response 201
  end

  test "should show query" do
    get query_url(@query), as: :json, headers: { "HTTP_AUTHENTICATION" => "Bearer #{@auth_token}" }

    assert_response :success
  end

  test "should not show query without authorization" do
    get query_url(@query), as: :json

    assert_response :unauthorized
  end
end
