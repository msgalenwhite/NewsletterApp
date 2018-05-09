class Api::V1::NewslettersController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: current_user.newsletters
  end

  def show
    newsletter_id = params["id"].to_i
    render json: Newsletter.find(newsletter_id)
  end
end
