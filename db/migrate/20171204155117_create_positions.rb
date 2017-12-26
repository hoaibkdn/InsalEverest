class CreatePositions < ActiveRecord::Migration[5.0]
  def change
    create_table :positions do |t|
      t.string :code
      t.string :name
      t.string :image
      t.text :description

      t.timestamps
    end
  end
end
