class AddCreatedAtToEntries < ActiveRecord::Migration[5.2]
  def change
    add_column :entries, :created_at, :datetime, null: false 
    add_column :entries, :updated_at, :datetime, null: false
  end
end
