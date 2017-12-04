class CreateShifts < ActiveRecord::Migration[5.0]
  def change
    create_table :shifts do |t|
      t.time :time_in
      t.time :time_out
      t.date :date
      t.references :user, foreign_key: true, null: false

      t.timestamps
    end
  end
end
