class Api::V1::SubscriptionsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    invitations = Invitation.where(email: current_user.email)
    inviteInfo = []

    invitations.each do |invite|
      inviteInfo << {
        host: invite.host.full_name,
        newsletter: invite.newsletter
      }
    end
    render json: inviteInfo, status: 200
  end
end
