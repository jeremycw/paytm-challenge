class ApplicationController < ActionController::API
  before_action :authorize

  def authorize
    if request.headers['HTTP_AUTHENTICATION'].nil?
      head :unauthorized
    else
      token = request.headers['HTTP_AUTHENTICATION'].split(' ').last
      @user_id = JWT.decode(token, nil, false)[0]["user_id"]
      head :unauthorized if @user_id.nil?
    end
  end
end
