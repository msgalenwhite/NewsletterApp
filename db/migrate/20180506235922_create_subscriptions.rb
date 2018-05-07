class CreateSubscriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :subscriptions do |t|
      t.belongs_to :newsletter
      t.belongs_to :user

      t.timestamps
    end
  end
end
