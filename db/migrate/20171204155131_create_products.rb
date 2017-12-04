class CreateProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :products do |t|
      t.string :code
      t.string :name
      t.string :image
      t.integer :quantity, default: 0
      t.text :description
      t.integer :state, default: 0
      t.references :unit, foreign_key: true, null: false
      t.references :category, foreign_key: true, null: false

      t.timestamps
    end
  end
end
