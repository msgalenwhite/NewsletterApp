class AddFounderToNewsletters < ActiveRecord::Migration[5.2]
  def change
    add_reference :newsletters, :user, index: true, null: false
  end
end
