class CreateLocations < ActiveRecord::Migration[5.0]
  def change
    create_table :locations do |t|
      t.string :name
      t.references :location_type, foreign_key: true, null: false
      t.references :position, foreign_key: true, null: false

      # todo

      t.timestamps
    end
  end
end
