class UserReviewedItemMailer < ApplicationMailer
  default from: "noreply@msgalenwhite.com"

  def send_invite(invitation)
    newsletter = Newsletter.find(invitation.newsletter_id)

    @invitation = invitation

    @host = @invitation.host.full_name
    @email = @invitation.email
    @name = @invitation.name
    @newsletter_name = newsletter.title
    @newsletter_desc = newsletter.description

    mail to: @email,
      subject: "#{@host.capitalize} invites you to the #{@newsletter_name}"
  end
end
