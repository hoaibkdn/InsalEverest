class CreateLocationTypes < ActiveRecord::Migration[5.0]
  def change
    create_table :location_types do |t|
      t.string :code
      t.string :name
      t.string :image

      t.timestamps
    end
  end
end
