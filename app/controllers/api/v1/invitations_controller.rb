class Api::V1::InvitationsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create

    # <ActionController::Parameters {"emails"=>[{"email"=>"sdef@email.com", "name"=>"sdef"}], "newsletterId"=>1, "controller"=>"api/v1/invitations", "action"=>"create", "format"=>"json", "invitation"=>{}} permitted: false>

    flash[:alert] = "We're still working on it"
  end
end
