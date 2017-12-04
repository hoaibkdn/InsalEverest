class Unit < ApplicationRecord
  has_one :product, dependent: :destroy
end
