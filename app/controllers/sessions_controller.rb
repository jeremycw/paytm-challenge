class SessionsController < ApplicationController
  skip_before_action :authorize

  # POST /session
  def create
    @user = User.find_by_email(session_params[:email])
    if @user.authenticate(session_params[:password])
      auth_token = JWT.encode({user_id: @user.id}, nil, 'none')
      render json: { auth_token: auth_token }, status: :created
    else
      head :unauthorized
    end
  end

  private
    # Only allow a trusted parameter "white list" through.
    def session_params
      params.fetch(:session, :email, :password)
    end
end
