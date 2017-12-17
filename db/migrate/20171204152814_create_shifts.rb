class CreateShifts < ActiveRecord::Migration[5.0]
  def change
    create_table :shifts do |t|
      t.time :time_in
      t.time :time_out
      t.string :description

      t.timestamps
    end
  end
end
