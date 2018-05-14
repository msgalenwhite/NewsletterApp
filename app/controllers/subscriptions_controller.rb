class SubscriptionsController < ApplicationController
  def edit
    @user = current_user
    @invitations = Invitation.where(email: @user.email)
  end

  def update


    redirect_to root_path
  end
end
