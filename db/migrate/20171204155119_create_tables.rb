class CreateTables < ActiveRecord::Migration[5.0]
  def change
    create_table :tables do |t|
      t.string :code
      t.string :name
      t.integer :image
      t.text :description
      t.integer :state, default: 0
      t.references :position, foreign_key: true, null: false

      t.timestamps
    end
  end
end
