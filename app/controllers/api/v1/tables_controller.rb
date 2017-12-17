class Api::V1::TablesController < Api::V1::BaseController
  before_action :load_table, only: [:update, :destroy]

  def create
    tables = Table.create_multi_record params[:table].as_json, params[:number].to_i
    if tables
      render_json_data(
        {
          data: tables.map{|table| response_data(TableSerializer, table)},
          message: {success: I18n.t("messages.create_success")}
        },
        201
      )
    else
      render_json_error({"tables": I18n.t("activerecord.errors.models.table.attributes.table.invalid")}, 422)
    end
  end

  def update
    if @table.update_attributes table_params
      render_json_data(
        {
          data: response_data(TableSerializer, @table),
          message: {success: I18n.t("messages.update_success")}
        },
        201
      )
    else
      render_json_error @table.errors, 422
    end
  end

  def destroy
    if @table.destroy
      render_json_data({data: {}, message: {success: I18n.t("messages.delete_success")}}, 201)
    else
      render_json_error @table.errors, 422
    end
  end

  private

  def table_params
    params.require(:table).permit :name, :image, :description, :state, :position_id
  end

  def load_table
    @table = Table.find_by id: params[:id]
    return if @table.present?
    render_json_error({"table": I18n.t("activerecord.errors.models.table.attributes.table.not_found")}, 422)
  end
end
