class Category < ApplicationRecord
  has_many :product, dependent: :destroy

  validates :name, presence: true
end
