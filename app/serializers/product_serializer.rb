class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :quantity, :description, :unit_id, :category_id
end
