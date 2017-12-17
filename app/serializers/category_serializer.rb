class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :description
end
