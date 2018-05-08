class Api::V1::EntriesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    entry = Entry.new(entries_params)

    if entry.save
      render json: entry
    else
      render json: entry.errors.full_messages.join(" // ")
    end
  end

  private

  def entries_params
    params.require(:entry).permit(:title, :body, :newsletter_id)
  end
end
