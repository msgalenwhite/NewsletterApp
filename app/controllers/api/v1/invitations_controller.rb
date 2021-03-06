class Api::V1::InvitationsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    newsletter = Newsletter.find(params["newsletterId"])

    @batch = InvitationBatch.new({
      newsletter: newsletter,
      invitees: params["emails"],
      host: current_user
    })

    if @batch.dispatch
      render json: @batch, status: :created
    else
      render json: @batch
    end
  end
end
