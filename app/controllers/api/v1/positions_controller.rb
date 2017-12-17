class Api::V1::PositionsController < Api::V1::BaseController
  before_action :load_position, only: [:update, :destroy]

  def create
    position = Position.new position_params
    if position.save
      render_json_data(
        {
          data: response_data(PositionSerializer, position),
          message: {success: I18n.t("messages.create_success")}
        },
        201
      )
    else
      render_json_error position.errors, 422
    end
  end

  def update
    if @position.update_attributes position_params
      render_json_data(
        {
          data: response_data(PositionSerializer, @position),
          message: {success: I18n.t("messages.update_success")}
        },
        201
      )
    else
      render_json_error @position.errors, 422
    end
  end

  def destroy
    if @position.destroy
      render_json_data({data: {}, message: {success: I18n.t("messages.delete_success")}}, 201)
    else
      render_json_error @position.errors, 422
    end
  end

  private

  def position_params
    params.require(:position).permit :name, :description
  end

  def load_position
    @position = Position.find_by id: params[:id]
    return if @position.present?
    render_json_error({"position": I18n.t("activerecord.errors.models.position.attributes.position.not_found")}, 422)
  end
end
