class ChangeGuestOnInvites < ActiveRecord::Migration[5.2]
  def up
    remove_column :invitations, :guest_id
    add_column :invitations, :email, :string, null: false
    add_column :invitations, :name, :string, null: false
  end

  def down
    remove_column :invitations, :email
    remove_column :invitations, :name
    add_column :invitations, :guest_id, :bigint
  end
end
