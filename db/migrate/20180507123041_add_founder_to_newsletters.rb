class AddFounderToNewsletters < ActiveRecord::Migration[5.2]
  def change
    add_column :newsletters, :founder_id, :integer, null: false
  end
end
