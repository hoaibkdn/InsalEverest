class Location < ApplicationRecord
  belongs_to :location_type
  belongs_to :position
end
