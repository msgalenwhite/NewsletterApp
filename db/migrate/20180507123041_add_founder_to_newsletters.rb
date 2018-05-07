class AddFounderToNewsletters < ActiveRecord::Migration[5.2]
  def change
    add_column :newsletters, :founder, :integer, null: false
  end
end
