class LocationType < ApplicationRecord
  has_one :location, dependent: :destroy
end
