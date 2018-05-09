class CreatePhotosTable < ActiveRecord::Migration[5.2]
  def change
    create_table :photos do |t|
      t.string :picture, null:false
      t.belongs_to :entry
    end
  end
end
