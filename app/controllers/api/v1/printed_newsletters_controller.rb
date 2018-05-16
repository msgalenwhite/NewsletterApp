class Api::V1::PrintedNewslettersController < ApplicationController
  def show
    newsletter_id = params["newsletter_id"].to_i

    date_info = params["id"].split("&")
    @month = date_info[0][6, date_info[0].length].to_i
    @year = date_info[1][5, date_info[1].length].to_i

    newsletter = Newsletter.find(newsletter_id)

    render json: newsletter, serializer: NewsletterEntrySerializer, month: @month, year: @year
  end
end
