class Api::V1::InvitationsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    binding.pry
  end
end
