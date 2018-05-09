class FunsController < ApplicationController
  def index
    @key = ENV["GOOGLE_MAPS_API_KEY"]
  end
end
