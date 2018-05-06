class CreateNewsletters < ActiveRecord::Migration[5.2]
  def change
    create_table :newsletters do |t|
      t.text :description, null: false
      t.string :thumb_photo
    end
  end
end
