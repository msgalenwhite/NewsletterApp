# Preview all emails at http://localhost:3000/rails/mailers/invitation
class InvitationPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/invitation/send_invite
  def send_invite
    InvitationMailer.send_invite
  end

end
