class Order < ApplicationRecord
  belongs_to :table

  has_many :product_orders, dependent: :destroy
end
