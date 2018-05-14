class Api::V1::NewslettersController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: current_user.newsletters
  end

  def show
    newsletter_id = params["id"].to_i
    newsletter = Newsletter.find(newsletter_id)
    response = {
      title: newsletter.title,
      description: newsletter.description,
      founder_name: newsletter.founder.full_name,
      photo: newsletter.thumb_photo.url,
      is_founder: current_user_is_founder?(newsletter)
    }

    render json: response
  end

  private

  def current_user_is_founder?(newsletter)
    current_user == newsletter.founder
  end
end
