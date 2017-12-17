class CreateSalaries < ActiveRecord::Migration[5.0]
  def change
    create_table :salaries do |t|
      t.float :per_hour, default: 0.0
      t.float :per_shift, default: 0.0
      t.integer :salary_type, default: 0
      t.string :description
      t.references :user, foreign_key: true, null: false
      t.references :shift, foreign_key: true, null: false

      t.timestamps
    end
  end
end
