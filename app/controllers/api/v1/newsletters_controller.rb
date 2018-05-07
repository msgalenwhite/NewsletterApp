class Api::V1::NewslettersController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: current_user.newsletters
  end
end
