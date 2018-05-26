require 'factory_bot'

FactoryBot.define do
  factory :entry do
    user
    newsletter
    title 'title'
    body 'body'
  end
end
