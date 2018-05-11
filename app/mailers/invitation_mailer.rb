class InvitationMailer < ApplicationMailer
  def new_invite(invite)
    @invite = invite

    mail (
      to: @invite.email,
      subject: "You've been invited to a new Family Newsletter!"
    )
  end
end
