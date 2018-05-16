class Api::V1::PrintedNewslettersController < ApplicationController
  def show
    newsletter_id = params["newsletter_id"].to_i

    date_info = params["id"].split("&")
    month = date_info[0][6, date_info[0].length].to_i
    year = date_info[1][5, date_info[1].length].to_i


    @entries = specific_entries(newsletter_id, year, month)

    returnObject = {
      newsletter: Newsletter.find(newsletter_id),
      entries: @entries
    }

    render json: returnObject
  end

  private

  def specific_entries(newsletter_id, year, month)
    possibleEntries = Entry.with_year_and_month(year, month)
    possibleEntries.select{ |entry| entry.newsletter_id = newsletter_id }
  end
end
