class CreateDiscounts < ActiveRecord::Migration[5.0]
  def change
    create_table :discounts do |t|
      t.references :product, foreign_key: true, null: false
      t.string :name
      t.date :date
      t.float :percent, default: 0.0
      t.text :description

      t.timestamps
    end
  end
end
