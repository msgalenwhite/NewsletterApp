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

  def create
    @subscriptions = []
    params["_json"].each do |id|
      invitation = Invitation.find_by_newsletter_id_and_email(id, current_user.email)
      new_subscription = Subscription.create(
        newsletter_id: id,
        user: current_user
      )
      @subscriptions << new_subscription
      invitation.destroy!
    end

    subscriptions_for_message = []
    @subscriptions.each { |s| subscriptions_for_message << s.newsletter.title }

    flash[:alert] = "You are now subscribed to #{subscriptions_for_message.join(', ')}"
    render json: subscriptions_for_message
  end
end
