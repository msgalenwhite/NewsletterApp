class CreateInvitations < ActiveRecord::Migration[5.2]
  def change
    create_table :invitations do |t|
      t.belongs_to :host
      t.belongs_to :guest
      t.belongs_to :newsletter

      t.timestamps
    end
  end
end
