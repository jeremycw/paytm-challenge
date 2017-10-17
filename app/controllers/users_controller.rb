class UsersController < ApplicationController
  skip_before_action :authorize, only: :create

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      auth_token = JWT.encode({user_id: @user.id}, nil, 'none')
      render json: { auth_token: auth_token }, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private
    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end
end
