class CreateProductOrders < ActiveRecord::Migration[5.0]
  def change
    create_table :product_orders do |t|
      t.references :product, foreign_key: true, null: false
      t.references :order, foreign_key: true, null: false
      t.integer :quantity, default: 0

      t.timestamps
    end
  end
end
