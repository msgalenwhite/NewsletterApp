class InvitationMailer < ApplicationMailer
  def new_invite(invite)
    @invite = invite
    @email = @invite.email
    mail(to: @email)
  end
end
