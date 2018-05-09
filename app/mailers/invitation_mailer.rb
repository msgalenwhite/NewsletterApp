class ReviewMailer < ApplicationMailer
  def new_invitation(invitation)
    @invitation = invitation

    mail(
      to: invitation.email,
      subject: "Come join #{current_user.full_name}'s Family Newsletter!"
    )
  end
end
