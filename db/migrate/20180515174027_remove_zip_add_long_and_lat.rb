class RemoveZipAddLongAndLat < ActiveRecord::Migration[5.2]
  def up
    add_column :users, :latitude, :float
    add_column :users, :longitude, :float
    remove_column :users, :zipcode
  end

  def down
    remove_column :users, :latitude
    remove_column :users, :longitude
    add_column :users, :zipcode, :integer
  end
end
