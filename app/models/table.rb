class Table < ApplicationRecord
  has_many :orders, dependent: :destroy
  has_many :products, through: :orders
  has_many :position_locations, dependent: :destroy
  has_many :locations, through: :position_locations
end
