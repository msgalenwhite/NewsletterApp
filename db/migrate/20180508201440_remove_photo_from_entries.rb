class RemovePhotoFromEntries < ActiveRecord::Migration[5.2]
  def up
    remove_column :entries, :photo
  end

  def down
    add_column :entries, :photo, :string
  end
end
