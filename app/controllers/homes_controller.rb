class HomesController < ApplicationController
  def index
    if !current_user
      redirect_to new_user_session_path
    elsif current_user && Invitation.where(email: current_user.email).length > 0
      redirect_to new_subscription_path
    else
      render :index
    end
  end
end
