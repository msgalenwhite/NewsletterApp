class Api::V1::EntriesController < ApplicationController
  # protect_from_forgery unless: -> { request.format.json? }
  skip_before_action :verify_authenticity_token

  def index
    current_year = Date.today.year
    current_month = Date.today.month
    current_month_entries = Entry.with_year_and_month(current_year, current_month)

    render json: current_month_entries.where(newsletter_id: params["newsletter_id"].to_i)
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
