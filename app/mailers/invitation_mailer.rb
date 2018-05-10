class InvitationMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.invitation_mailer.send_invite.subject
  #
  def send_invite # yes, this is defined like an instance method (aka it doesn't start with self.) but it can be called like a class method

    @greeting = "Hi"

    mail to: "to@example.org",
      subject: "Welcome to the Family Newsletter!"
    #set up headers here - make sure it's the last line in the method
  end
end
