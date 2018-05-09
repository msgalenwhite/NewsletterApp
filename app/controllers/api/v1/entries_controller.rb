class Api::V1::EntriesController < ApplicationController
  # protect_from_forgery unless: -> { request.format.json? }
  skip_before_action :verify_authenticity_token

  def create
    binding.pry
    entry = Entry.new(entries_params)
    entry.user = current_user

    if entry.save
      render json: entry
    else
      render json: entry.errors.full_messages.join(" // ")
    end
  end

  private

  def entries_params
    params.require(:entry).permit(:title, :body, :newsletter_id, :photo)
  end
end
