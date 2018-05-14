class HomesController < ApplicationController
  def index
    if !current_user
      redirect_to new_user_session_path
    elsif current_user && Invitation.where(email: current_user.email)
      redirect_to newsletter_subscription_index
    end
  end
end
