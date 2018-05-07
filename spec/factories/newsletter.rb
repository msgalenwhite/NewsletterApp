require 'factory_bot'

FactoryBot.define do
  factory :newsletter do
    title 'title'
    description 'description'
    thumb_photo { Rack::Test::UploadedFile.new(Rails.root.join('spec', 'support', 'images', 'purple_flowers.jpg')) }
    association :founder, factory: [:user]
  end
end
