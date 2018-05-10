class InvitationMailer < ApplicationMailer::Base
  def invitation_email
    @host = params[:host].full_name.capitalize
    @newsletter = params[:newsletter].capitalize
    @description = params[:description]
    @email = params[:email]
    @name = params[:name].capitalize

    mail(
      to: @email,
      subject: "Come join #{current_user.full_name}'s Family Newsletter!"
    )
  end
end
