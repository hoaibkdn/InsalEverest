class Shift < ApplicationRecord
  has_one :salary, dependent: :destroy
end
