class Api::V1::UsersController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    id = params["newsletter_id"].to_i
    newsletter = Newsletter.find(id)
    render json: newsletter.users
  end
end
