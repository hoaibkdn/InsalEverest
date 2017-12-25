class Table < ApplicationRecord
  belongs_to :position, required: true

  has_many :orders, dependent: :destroy
  has_many :products, through: :orders

  validates :name, presence: true, uniqueness: true, length: {maximum: Settings.validations.name.max_length}

  mount_uploader :image, ImageUploader

  class << self
    def create_multi_record table_attr, number
      id_last = Table.last.try(:id) || 0
      tables_valid = true
      ActiveRecord::Base.transaction do
        (1..number).map do
          id_last += 1
          table = table_attr.dup.slice("name", "description", "position_id").tap do |attr|
            attr["name"] = "#{attr["name"]}#{id_last}"
          end
          create! table
        end
      end
    rescue Exception => e
      tables_valid = false
    end
  end
end
