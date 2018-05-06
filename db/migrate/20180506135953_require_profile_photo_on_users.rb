class RequireProfilePhotoOnUsers < ActiveRecord::Migration[5.2]
  def up
    change_column :users, :profile_photo, :string, null:false
  end

  def down
    change_column :users, :profile_photo, :string
  end
end
