require 'factory_bot'

FactoryBot.define do
  factory :entry do
    user
    newsletter
    title 'title'
    body 'body'
    photo { Rack::Test::UploadedFile.new ("#{Rails.root}/spec/support/images/purple_flowers.jpg") }
  end
end
