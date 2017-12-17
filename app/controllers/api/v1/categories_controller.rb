class Api::V1::CategoriesController < Api::V1::BaseController
  before_action :check_category, only: [:update, :destroy]

  def create
    category = Category.new category_params
    if category.save
      render_json_data ({data: response_data(category), message:{success: I18n.t("messages.create_success")}}), 201
    else
      render_json_error category.errors, 422
    end
  end

  def update
    if @category.update category_params
      render_json_data ({data: response_data(@category), message:{success: I18n.t("messages.update_success")}}), 201
    else
      render_json_error @category.errors, 422
    end
  end

  def destroy
    @category.destroy
    render_json_data ({data: {}, message:{success: I18n.t("messages.delete_success")}}), 201
  end

  private

  def category_params
    params.require(:category).permit :name, :image, :description
  end

  def check_category
    @category = Category.find_by id: params[:id]
    render_json_error({category: I18n.t("errors.blank")}, 422) unless @category
  end

  def response_data category
    CategorySerializer.new category
  end
end
