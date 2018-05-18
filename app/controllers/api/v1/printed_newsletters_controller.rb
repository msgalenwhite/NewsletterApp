class Api::V1::PrintedNewslettersController < ApplicationController
  def index
    newsletter_id = params["newsletter_id"].to_i

    month = params["month"].to_i
    year = params["year"].to_i

    newsletter = Newsletter.find(newsletter_id)

    render json: newsletter, serializer: NewsletterEntrySerializer, month: month, year: year
  end
end
