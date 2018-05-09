class Api::V1::InvitesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    params["emails"].each do
      invite = Invite.create(invites_params)
      invite.host = current_user
      invite.newsletter_id = params["newsletterId"].to_i

      if invite.save
        #return something


      else
        #return an error
      end
    end

    #now I have all of my email information, send the emails!
    #maybe pass off to a different method?

  end

  private

  def invites_params
    params.require(:emails).permit(:email, :name)
  end
end
