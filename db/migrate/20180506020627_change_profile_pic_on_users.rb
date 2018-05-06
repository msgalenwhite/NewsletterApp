class ChangeProfilePicOnUsers < ActiveRecord::Migration[5.2]
  def up
    remove_column :users, :pic_url
    add_column :users, :profile_photo, :string
  end

  def down
    remove_column :users, :profile_photo
    add_column :users, :pic_url, :string
  end
end
