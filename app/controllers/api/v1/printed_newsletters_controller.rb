class Api::V1::PrintedNewslettersController < ApplicationController
  def show
    @newsletter = Newsletter.find(params["newsletter_id"].to_i)
    date_info = params["id"].split("&")
    @month = date_info[0][6, date_info[0].length].to_i
    @year = date_info[1][5, date_info[1].length].to_i

    @entries = @newsletters.entries.with_year_and_month(@year, @month)

    returnObject = {
      newsletter: @newsletter,
      entries: @entries
    }

    render json: returnObject
  end
end
