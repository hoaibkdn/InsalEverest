class Api::V1::UsersController < Api::V1::BaseController

  def create
    user = User.new sign_up_params
    if user.save
      Api::V1::GenerateToken.perform(user.id)
      render_json_data ({data: User.order(id: :desc)}), 201
    else
      render_json_error user.errors, 422
    end
  end

  def update

  end

  private

  def sign_up_params
    params.require(:user).permit :email, :name, :password, :password_confirmation, :birthday, :gender, :address, :role_id
  end
end
