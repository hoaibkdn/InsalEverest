class Position < ApplicationRecord
  has_many :tables, dependent: :destroy
  has_many :locations, dependent: :destroy

  validates :name, presence: true, length: {maximum: Settings.validations.name.max_length}

  mount_uploader :image, ImageUploader
end
