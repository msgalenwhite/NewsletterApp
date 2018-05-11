class InvitationMailer < ApplicationMailer
  def new_invite(invite)
    require 'pry'
    binding.pry
    @invite = invite
    @email = @invite.email
    mail(to: @email)
  end
end
