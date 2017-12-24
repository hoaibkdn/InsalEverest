class Api::V1::ProductsController < Api::V1::BaseController
  before_action :check_product, only: [:update, :destroy]

  def create
    product = Product.new product_params
    if product.save
      render_json_data ({data: response_data(ProductSerializer, product), message:{success: I18n.t("messages.create_success")}}), 201
    else
      render_json_error product.errors, 422
    end
  end

  def update
    if @product.update product_params
      render_json_data ({data: response_data(ProductSerializer, @product), message:{success: I18n.t("messages.update_success")}}), 201
    else
      render_json_error @product.errors, 422
    end
  end

  def destroy
    @product.destroy
    render_json_data ({data: {}, message:{success: I18n.t("messages.delete_success")}}), 201
  end

  private

  def product_params
    params.require(:product).permit :name, :image, :quantity, :description, :unit_id, :category_id

  end

  def check_product
    @product = Product.find_by id: params[:id]
    render_json_error({product: I18n.t("errors.blank")}, 422) unless @product
  end
end
