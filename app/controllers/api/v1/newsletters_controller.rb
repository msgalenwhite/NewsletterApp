class Api::V1::NewslettersController < ApplicationController
  def index
    render json: current_user.newsletters
  end
end
