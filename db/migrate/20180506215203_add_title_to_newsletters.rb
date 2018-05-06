class AddTitleToNewsletters < ActiveRecord::Migration[5.2]
  def up
    add_column :newsletters, :title, :string, null: false
  end

  def down
    remove_column :newsletters, :title
  end
end
