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

    else
      render json: @batch.errors
    end


### BEFORE MEETING WITH DAN:
#     params["emails"].each do |data_hash|
#       @invitation = Invitation.new(
#         host_id: current_user.id,
#         newsletter_id: params["newsletterId"],
#         email: data_hash["email"],
#         name: data_hash["name"]
#       )
#       if @invitation.save
# ####
#
#
#
#
#       else
#         @failures << @invitation
#       end
#     end

    # render json: response
  end
end
