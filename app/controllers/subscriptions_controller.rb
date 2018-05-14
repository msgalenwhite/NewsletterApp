class SubscriptionsController < ApplicationController
  def new
    @user = current_user
    invitations = Invitation.where(email: @user.email)
    @inviteInfo = []

    invitations.each do |invite|
      @inviteInfo << {
        host => invite.host.full_name,
        newsletter => invite.newsletter
      }
    end
  end

  def create
    binding.pry

    redirect_to root_path
  end
end
