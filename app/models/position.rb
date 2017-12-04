class Position < ApplicationRecord
  has_many :position_tables, dependent: :destroy
  has_many :tables, through: :position_tables
end
