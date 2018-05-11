class CreateGeolocations < ActiveRecord::Migration[5.2]
  def change
    create_table :geolocations do |t|
      t.belongs_to :user
      t.string :latitude, null: false
      t.string :longitude, null: false
    end
  end
end
