class TableSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :description, :state, :position_id
end
