class Api::V1::EntriesController < ApplicationController
  # protect_from_forgery unless: -> { request.format.json? }
  skip_before_action :verify_authenticity_token

  def index
    #find this months' entries
    
  end

  def create
    entry = Entry.new(entries_params)
    entry.user = current_user
    entry.newsletter_id = params["newsletter_id"].to_i

    if entry.save
      render json: entry
    else
      flash[:message] = "Your entry could not be submitted."
      render json: entry.errors.full_messages.join(" // ")
    end
  end

  private

  def entries_params
    params.permit(:title, :body, :photo)
  end
end
