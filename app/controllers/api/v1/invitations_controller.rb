class Api::V1::InvitationsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    # => <ActionController::Parameters {"emails"=>[{"email"=>"feswd@test.com", "name"=>"ljkgsdewr"}], "newsletterId"=>1, "controller"=>"api/v1/invitations", "action"=>"create", "format"=>"json", "invitation"=>{}} permitted: false>
    # failures = []
    newsletter = Newsletter.find(params["newsletterId"])

    @batch = InvitationBatch.new({
      newsletter: newsletter,
      invitees: params["emails"],
      host: current_user
    })

    if @batch.dispatch
      render json: @batch
    else
      render json: @batch
    end
  end
end
