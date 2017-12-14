class Api::V1::GenerateToken
  class << self
    def perform user
      # Kiểm tra và tạo mới tocken
      user_token =  Doorkeeper::AccessToken.find_or_create_by resource_owner_id: user
      token_info = Doorkeeper::OAuth::TokenResponse.new(user_token).body
      created_at = token_info["created_at"]
      token_info.tap do |attr|
        attr["created_at"] = Time.zone.at(created_at).iso8601
        attr["user_id"] = user
        attr["message"] = {log_in: "Bạn đả đăng nhập thành công"}
      end
    end
  end
end
