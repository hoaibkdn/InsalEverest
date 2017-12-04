class CreatePositionTables < ActiveRecord::Migration[5.0]
  def change
    create_table :position_tables do |t|
      t.references :position, foreign_key: true, null: false
      t.references :table, foreign_key: true, null: false

      t.timestamps
    end
  end
end
