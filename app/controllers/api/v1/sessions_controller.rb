class Api::V1::SessionsController < Api::V1::BaseController
  skip_before_action :doorkeeper_authorize!, only: :create

  def create
    user = User.find_by email: params[:session][:user][:email].downcase
    if user && user.valid_password?(params[:session][:user][:password])
      log_in user
      render_json_data Api::V1::GenerateToken.perform(user.id), 201
    else
      render_json_error check_login_valid?(user), 422
    end
  end

  private

  def check_login_valid? user
    if user.blank?
      {email: "Email không tồn tại"}
     else
       {password: "Mật khẩu không chính xác"}
     end
  end
end
