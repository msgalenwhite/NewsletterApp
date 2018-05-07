class CreateEntries < ActiveRecord::Migration[5.2]
  def change
    create_table :entries do |t|
      t.belongs_to :user
      t.belongs_to :newsletter

      t.string :title, null: false
      t.text :body, null: false
      t.string :photo
    end
  end
end
