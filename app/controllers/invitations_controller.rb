class InvitationsController < ApplicationController
  def show
    ## this is where the QR code will send new people
    ## there should be an "id" in params... hopefully, since it's a show tag.
    ## find Invitations.where(newsletter_id: params["id"])
    ## create a dropdown of options from the names in those invitations (collect emails, too)

    ## when one is selected, user is sent to the log in page, with some data already entered 
  end
end
