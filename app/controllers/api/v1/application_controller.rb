class Api::V1::ApplicationController < ActionController::API
  include Api::V1::ApplicationHelper

  # Truy cập nếu có tocken
  before_action :doorkeeper_authorize!
  # Lấy thằng user hiện tại
  before_action :check_logged

  def doorkeeper_unauthorized_render_options error: nil
    {json: {error: "Không có quyền truy cập"}}
  end

  def check_logged
    user_request = User.find_by_id(doorkeeper_token.resource_owner_id) if doorkeeper_token
    render json: {json: {error: "Bạn chưa đăng nhập"}} if (current_user != user_request && user_request != nil)
  end
end
