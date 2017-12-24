class Product < ApplicationRecord
  belongs_to :unit
  belongs_to :category

  has_many :product_orders, dependent: :destroy
  has_many :orders, through: :product_orders
  has_many :discount, dependent: :destroy

  validates :name, presence: true
  validates :unit_id, presence: true
  validates :category_id, presence: true
end
