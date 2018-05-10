class Api::V1::InvitationsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    binding.pry
    # => <ActionController::Parameters {"emails"=>[{"email"=>"feswd@test.com", "name"=>"ljkgsdewr"}], "newsletterId"=>1, "controller"=>"api/v1/invitations", "action"=>"create", "format"=>"json", "invitation"=>{}} permitted: false>
    response = []

    params["emails"].each do |data_hash|
      @invitation = Invitation.new(
        host_id: current_user.id,
        newsletter_id: data_hash["newsletterId"],
        email: data_hash["email"],
        name: data_hash["name"]
      )

      if @invitation.save
        InvitationMailer.send_invite(@invitation).deliver_now

        response << { email: @invitation.email, name: @invitation.name }

        flash[:alert] = "We're still working on it"
      end

      redirect_to root_path
    end

    render json: response
  end
end
